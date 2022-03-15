import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CreatePersonCommand, ICreatePersonCommand, PersonDetailVm } from 'src/app/membermanager-api';
import { MemberFormComponent } from 'src/app/shared/components/member-form/member-form.component';

@Component({
  selector: 'app-member-self-managed',
  templateUrl: './member-self-managed.component.html',
  styleUrls: ['./member-self-managed.component.scss']
})
export class MemberSelfManagedComponent implements OnInit {
  @Input() memberData?: PersonDetailVm;

  @ViewChild(MemberFormComponent) memberFormComp: MemberFormComponent;

  isEditing = false;

  // For backend validation
  errorHintTitle = 'Person nicht erstellt:';
  invalidHints: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    const command = this.convertCreateFormIntoCommand(this.memberFormComp.personalForm.value);

    this.isEditing = false;
  }

  onCancel(){
    this.isEditing = false;
  }

  private convertCreateFormIntoCommand(formResult: any): CreatePersonCommand {
    const iCommand: ICreatePersonCommand = {
      // formresult is fromgroup.value, get value by fromgrou.<nameoFormControl> See personalForm (Formgruop) of memberFormComp
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
      initialCareerLevelId: formResult.initialCareerLevelId,
      initialMemberStatusId: formResult.initialMemberStatusId,
      joinDate: formResult.joinDate,
    };
    return new CreatePersonCommand(iCommand);
  }

}