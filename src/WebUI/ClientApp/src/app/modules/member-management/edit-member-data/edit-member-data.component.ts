import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  IUpdatePersonCommand,
  PeopleClient,
  PersonDetailVm,
  UpdatePersonCommand,
} from "src/app/membermanager-api";
import { CreateMemberComponent } from "../create-member/create-member.component";

/**
 * Edit People Modal
 * @extends CreateMemberComponent
 * most Logic in CreatePersonComponent
 */
@Component({
  selector: "app-edit-pesonal-data",
  templateUrl: "./edit-member-data.component.html",
  styleUrls: ["./edit-member-data.component.scss"],
})
export class EditMemberDataComponent
  extends CreateMemberComponent
  implements OnInit, AfterViewInit {
  memberdata: PersonDetailVm;

  errorHintTitle = "Änderungen nicht übernommen";

  constructor(
    public dialogRef: MatDialogRef<CreateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected memberApi: PeopleClient
  ) {
    super(dialogRef, memberApi);
  }

  ngOnInit(): void {
    this.memberdata = this.data;
  }

  /**
   * @override
   */
  protected handleFormValid() {
    const command = this.convertEditFormIntoCommand(this.getResult());
    this.memberApi.update(this.memberdata.id, command).subscribe(
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
    let birthday: Date;
    if (formResult.birthdate) {
      birthday = new Date(formResult.birthdate);
    }
    const iCommand: IUpdatePersonCommand = {
      // formresult is fromgroup.value, get value by fromgrou.<nameoFormControl> See personalForm (Formgruop) of memberFormComp
      id: this.memberdata.id,
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
    return new UpdatePersonCommand(iCommand);
  }
}
