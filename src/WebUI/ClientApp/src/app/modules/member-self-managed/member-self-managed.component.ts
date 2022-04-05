import {
  IUpdatePersonCommand,
  SelfManagementClient,
  UpdatePersonCommand,
} from './../../membermanager-api';
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
export class MemberSelfManagedComponent
  extends MemberFormComponent
  implements OnInit
{
  @ViewChild(MemberFormComponent) memberFormComp: MemberFormComponent;

  isEditing = false;

  // For backend validation
  errorHintTitle = 'Person nicht erstellt:';
  invalidHints: Array<string>;

  constructor(
    protected memberStatusCareerLevelService: MemberstatusCareerlevelService,
    protected selfManagementClient: SelfManagementClient
  ) {
    super(memberStatusCareerLevelService);
  }

  ngOnInit(): void {
    this.loadMemberData();
    this.personalForm.disable();
  }

  loadMemberData() {
    this.memberData = {
      id: 0,
      firstName: 'Adrian',
      surname: 'Alfermann',
      birthdate: '28.05.1996',
      gender: Gender.MALE,
      emailPrivate: 'alfsmail@web.de',
      emailAssociaton: 'aalfermann@campus-consult.org',
      mobilePrivate: '+49 12345 12345',
      adressStreet: 'Kettenweg',
      adressNo: '17',
      adressZIP: '33106',
      adressCity: 'Paderborn',
      careerLevels: undefined,
      memberStatus: undefined,
      positions: undefined,
    };

    this.selfManagementClient
      .getOverview()
      .subscribe((value: PersonDetailVm) => {
        this.memberData = value;
        this.addPersonalDataToForm();
      });
  }

  onSubmit() {
    const command = this.convertCreateFormIntoCommand(
      this.personalForm.value
    );
    this.selfManagementClient.update(command).subscribe(
      () => {
        this.isEditing = false;
      },
      (error) => {}
    );
  }

  changeEditMode() {
    this.isEditing = !this.isEditing;
    this.isEditing ? this.personalForm.enable() :  this.personalForm.disable() 
  }



  private convertCreateFormIntoCommand(formResult: any): UpdatePersonCommand {
    const iCommand: IUpdatePersonCommand = {
      id: this.memberData.id,
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
      // initialCareerLevelId: formResult.initialCareerLevelId,
      // initialMemberStatusId: formResult.initialMemberStatusId,
      // joinDate: formResult.joinDate,
    };
    return new CreatePersonCommand(iCommand);
  }
}
