import {
  IUpdatePersonCommand,
  SelfManagementClient,
  UpdatePersonCommand,
} from '../../../membermanager-api';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  CreatePersonCommand,
  Gender,
  ICreatePersonCommand,
  PersonDetailVm,
} from 'src/app/membermanager-api';
import { MemberstatusCareerlevelService } from 'src/app/memberstatus-careerlevel.service';
import { MemberFormComponent } from 'src/app/shared/components/member-form/member-form.component';

@Component({
  selector: 'app-member-self-managed',
  templateUrl: './member-self-managed.component.html',
  styleUrls: ['./member-self-managed.component.scss'],
})
export class MemberSelfManagedComponent implements OnInit
{
  @ViewChild(MemberFormComponent) memberFormComp: MemberFormComponent;

  memberData: PersonDetailVm;

  isEditing = false;

  // For backend validation
  errorHintTitle = 'Person nicht erstellt:';
  invalidHints: Array<string>;

  constructor(
    protected selfManagementClient: SelfManagementClient
  ) {
  }

  ngOnInit(): void {
    this.loadMemberData();  
  }

  loadMemberData() {

    this.selfManagementClient
      .getOverview()
      .subscribe((value: PersonDetailVm) => {
          this.memberData = value;
      }, error => console.error(error));
  }

  onSubmit() {
    const command = this.convertCreateFormIntoCommand(
      this.memberFormComp.personalForm.value
    );
    this.selfManagementClient.update(command).subscribe(
      () => {
        this.loadMemberData(); // TODO: Passe API an, dass die aktuelle Version vom Server kommt. 
        this.isEditing = false;
      },
      (error) => {
        // TODO: show user error Message!
        console.error(error);
      }
    );
  }

  changeEditMode() {
    this.isEditing = !this.isEditing;
  }

  private convertCreateFormIntoCommand(formResult: any): UpdatePersonCommand {
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
}
