import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonDetailVm } from 'src/app/membermanager-api';
import { MemberFormComponent } from 'src/app/shared/components/member-form/member-form.component';
import {
  CreatePersonCommand,
  ICreatePersonCommand,
  IUpdatePersonCommand,
  SelfManagementClient,
  UpdatePersonCommand,
} from '../../../membermanager-api';

@Component({
  selector: 'app-member-self-managed',
  templateUrl: './member-self-managed.component.html',
  styleUrls: ['./member-self-managed.component.scss'],
})
export class MemberSelfManagedComponent implements OnInit {
  @ViewChild(MemberFormComponent) memberFormComp: MemberFormComponent;

  memberData: PersonDetailVm;

  isEditing = false;

  // For backend validation
  errorHintTitle = 'Person nicht erstellt:';
  invalidHints: Array<string>;

  constructor(protected selfManagementClient: SelfManagementClient) {}

  ngOnInit(): void {
    this.loadMemberData();
  }

  loadMemberData() {
    this.selfManagementClient.getOverview().subscribe(
      (value: PersonDetailVm) => {
        this.memberData = value;
      },
      (error) => console.error(error)
    );
  }

  onCreateSubmit() {
    const command = this.convertCreateFormIntoCommand(
      this.memberFormComp.personalForm.value
    );
    this.selfManagementClient.create(command).subscribe(
      () => {
        this.loadMemberData();
        // TODO: Passe API an, dass die aktuelle Version vom Server kommt.
        this.isEditing = false;
      },
      (error) => this.handleSubmitError(error)
    );
  }

  onEditSubmit() {
    const command = this.convertEditFormIntoCommand(
      this.memberFormComp.personalForm.value
    );
    this.selfManagementClient.update(command).subscribe(
      () => {
        this.loadMemberData();
        // TODO: Passe API an, dass mit dem ersten Request die aktuelle Version vom Server kommt.
        this.isEditing = false;
      },
      (error) => this.handleSubmitError(error)
    );
  }

  handleSubmitError(error) {
    console.error(error);
    // TODO: show user error Message!
  }

  changeEditMode() {
    this.isEditing = !this.isEditing;
  }

  private convertEditFormIntoCommand(formResult: any): UpdatePersonCommand {
    const iCommand: IUpdatePersonCommand = {
      id: this.memberData.id,
      firstName: formResult.firstName,
      surname: formResult.lastName,
      birthdate: formResult.birthdate,
      gender: formResult.gender,
      emailPrivate: formResult.emailPrivate,
      emailAssociaton: formResult.emailAssociaton,
      mobilePrivate: formResult.mobilePrivate,
      adressStreet: formResult.adressStreet,
      adressNo: formResult.adressNr,
      adressZIP: formResult.adressZIP,
      adressCity: formResult.adressCity,
    };
    return new UpdatePersonCommand(iCommand);
  }

  private convertCreateFormIntoCommand(formResult: any): CreatePersonCommand {
    const iCommand: ICreatePersonCommand = {
      firstName: formResult.firstName,
      surname: formResult.lastName,
      birthdate: formResult.birthdate,
      gender: formResult.gender,
      emailPrivate: formResult.emailPrivate,
      emailAssociaton: formResult.emailAssociaton,
      mobilePrivate: formResult.mobilePrivate,
      adressStreet: formResult.adressStreet,
      adressNo: formResult.adressNr,
      adressZIP: formResult.adressZIP,
      adressCity: formResult.adressCity,
    };
    return new CreatePersonCommand(iCommand);
  }
}
