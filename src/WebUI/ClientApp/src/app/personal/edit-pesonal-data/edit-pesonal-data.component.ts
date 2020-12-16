import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUpdatePersonCommand, PeopleClient, PersonDetailVm, UpdatePersonCommand } from 'src/app/membermanager-api';
import { CreatePersonComponent } from '../create-person/create-person.component';

/**
 * Edit People Modal
 * @extends CreatePersonComponent
 * most Logic in CreatePersonComponent 
 */
@Component({
  selector: 'app-edit-pesonal-data',
  templateUrl: './edit-pesonal-data.component.html',
  styleUrls: ['./edit-pesonal-data.component.scss'],
})
export class EditPersonalDataComponent extends CreatePersonComponent implements OnInit, AfterViewInit {

  memberdata: PersonDetailVm;
  
  errorHintTitle = 'Änderungen nicht übernommen'

  constructor(public dialogRef: MatDialogRef<CreatePersonComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected personApi: PeopleClient) {
    super(dialogRef, personApi);
  }

  ngOnInit(): void {
    this.memberdata = this.data;
  }

  /**
   * @override
   */
  protected handleFormValid(){
    const command = this.convertEditFormIntoCommand(this.getResult());
      this.personApi.update(this.memberdata.id, command).subscribe(
        (val) => {
          // Modal Output User Input in Modal
          this.dialogRef.close(this.getResult());
          // TODO: Succesfull Toast
        },
        (err) => {
          console.error(err);
          this.handleError(err);
        }
      );
  }

  private convertEditFormIntoCommand(formResult: any): UpdatePersonCommand {
    // Casting
    const birthday = new Date(formResult.birthdate);
    const iCommand: IUpdatePersonCommand = {
      // formresult is fromgroup.value, get value by fromgrou.<nameoFormControl> See personalForm (Formgruop) of memberFormComp
      firstName: formResult.firstName,
      surname: formResult.lastName,
      birthdate: birthday,
      gender: formResult.gender,
      emailPrivate: formResult.emailPrivate,
      emailAssociaton: formResult.emailAssociaton,
      mobilePrivate: formResult.mobilePrivate,
      adressStreet: formResult.adressStreet,
      adressNo: formResult.adressNr,
      adressZIP: formResult.adressZIP,
      adressCity: formResult.adressCity,
    };
    console.warn("convertFormIntoCommand not implemented");
    return new UpdatePersonCommand(iCommand);
  }


}
