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

    this.selfManagementClient
      .getOverview()
      .subscribe((value: PersonDetailVm) => {
        if(value) {
          this.memberData = value;
          this.addPersonalDataToForm();
        } else {
          console.warn('Loaded Member is undefined');
        }
      }, error => console.error(error));
  }

  onSubmit() {
    const command = this.convertCreateFormIntoCommand(
      this.personalForm.value
    );
    this.selfManagementClient.update(command).subscribe(
      (value) => {
                
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
    return new UpdatePersonCommand(iCommand);
  }
}
