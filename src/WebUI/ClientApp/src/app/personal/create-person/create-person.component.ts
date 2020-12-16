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
  errorHintTitle = 'Person nicht erstellt:'
  invalidHints: Array<string>;
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
    const isvalid = this.validateForm();
    if (isvalid) {
      this.handleFormValid()
    } else {
      this.handleFormInvalid()
    }
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }

  protected validateForm(): boolean {
    return this.memberForm.valid;
  }

  /**
   * @override
   * Methode Called in OnSubmit when Form is Valid
   * Do BackendRequest with user input
   */
  protected handleFormValid() {
    const command = this.convertCreateFormIntoCommand(this.getResult());
    this.personApi.create(command).subscribe(
      (val) => {
        // Modal Output User Input in Modal
        this.dialogRef.close(this.getResult());
        // TODO: Succesfull Toast
      },
      (err) => {
        this.handleError(err);
      }
    );
  }
  
  /**
   * @override
   * Methode Called in OnSubmit when Form is invalid
   * inform user, by adding Invalid Hints or something similiar
   */
  protected handleFormInvalid() {
    throw new Error("Method not implemented.");
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

  protected handleError(err) {
    this.invalidHints = new Array<string>();
    try {
      this.lastRequestErr = JSON.parse(err.response);
      // Prepare input-invalid-msg
      this.invalidHints.push('Backend: ERROR-STATUS '+this.lastRequestErr.status);
      for (const key in this.lastRequestErr.errors) {
        if (Object.prototype.hasOwnProperty.call(this.lastRequestErr, key)) {
          this.invalidHints.push(this.lastRequestErr[key]);
        }
      }
    } catch (parseErr) {
      console.warn("ERROR: Probably could not parse Request");
      console.error(parseErr);
      this.invalidHints.push("Ein unbekannter Fehler ist aufgetreten!");
    } finally {
      console.error(err);
    }
  }
}
