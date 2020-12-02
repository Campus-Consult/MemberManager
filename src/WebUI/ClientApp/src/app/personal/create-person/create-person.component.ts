import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CreatePersonCommand, PeopleClient } from "src/app/membermanager-api";
import { MemberFormComponent } from "./member-form/member-form.component";

/**
 * Create People Modal
 */
@Component({
  selector: "app-create-person",
  templateUrl: "./create-person.component.html",
  styleUrls: ["./create-person.component.scss"],
})
export class CreatePersonComponent implements AfterViewInit {
  @ViewChild(MemberFormComponent) memberFormComp: MemberFormComponent;

  memberForm: FormGroup;

  // For backend validation
  invalidHints = new Array<string>();
  lastRequestErr;

  constructor(
    public dialogRef: MatDialogRef<CreatePersonComponent>,
    protected personApi: PeopleClient
  ) {}

  ngAfterViewInit() {
    this.memberForm = this.memberFormComp.personalForm;
  }

  /**
   * Results Module returns on close
   */
  getResult(): any {
    return this.memberForm.value;
  }

  onSubmit() {
    const isvalid = this.validateInputFront();
    this.handleValidation(isvalid);

    if (isvalid) {
      const command = this.convertCreateFormIntoCommand(this.getResult());
      this.personApi.create(command).subscribe(
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
  }

  handleValidation(isvalid: boolean) {
    console.warn("handleValidation not implemented");
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }

  validateInputFront(): boolean {
    return this.memberForm.valid;
  }

  private convertCreateFormIntoCommand(formResult: any): CreatePersonCommand {
    // Casting
    let birthday: Date;
    if (formResult.birthdate) {
      birthday = new Date(formResult.birthdate);
    }
    console.log(birthday);

    const iCommand = {
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
    return new CreatePersonCommand(iCommand);
  }

  handleError(err) {
    try {
      this.lastRequestErr = JSON.parse(err);
      if (this.lastRequestErr.status === 400) {
        this.invalidHints = new Array<string>()
        // Prepare input-invalid-msg
        for (const key in this.lastRequestErr.errors) {
          if (Object.prototype.hasOwnProperty.call(this.lastRequestErr, key)) {
            this.invalidHints.push(this.lastRequestErr[key]);
          }
        }
      }
    } catch (err) {
      console.warn("Could not parse Request ERROR");
    } finally {
      console.error(err);
    }
  }
}
