import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CareerLevelDto, CareerLevelLookupDto, CreatePersonCommand, ICreatePersonCommand, MemberStatusLookupDto, PeopleClient } from "src/app/membermanager-api";
import { MemberFormComponent } from "./member-form/member-form.component";

/**
 * Create People Modal
 */
@Component({
  selector: "app-create-person",
  templateUrl: "./create-member.component.html",
  styleUrls: ["./create-member.component.scss"],
})
export class CreateMemberComponent implements AfterViewInit {
  @ViewChild(MemberFormComponent) memberFormComp: MemberFormComponent;

  memberForm: FormGroup;

  // For backend validation
  errorHintTitle = "Person nicht erstellt:";
  invalidHints: Array<string>;
  lastRequestErr;

  constructor(
    public dialogRef: MatDialogRef<CreateMemberComponent>,
    protected memberApi: PeopleClient
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
    console.log("Form valid:" + isvalid);

    if (isvalid) {
      this.handleFormValid();
    } else {
      this.handleFormInvalid();
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
    console.log(command);

    this.memberApi.create(command).subscribe(
      () => {
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
    const invalid = [];
    this.invalidHints = [];
    const controls = this.memberForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        this.invalidHints.push(name);
      }
    }
  }

  private convertCreateFormIntoCommand(formResult: any): CreatePersonCommand {
    // Casting
    let birthday: Date;
    if (formResult.birthdate) {
      birthday = new Date(formResult.birthdate);
    }
    // do propertys undefined if blank string, because backend intepret value is set and checks format 
/*     const commandPrep = {};
    for (const key in formResult) {
      if (Object.prototype.hasOwnProperty.call(formResult, key) && formResult[key] !== '') {
        commandPrep[key] = ;
        
      }
    } */

    console.log(formResult);

    const iCommand: ICreatePersonCommand = {
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
      initialCareerLevelId: formResult.initialCareerLevelId,
      initialMemberStatusId: formResult.initialMemberStatusId,
      joinDate: formResult.joinDate,
    };
    return new CreatePersonCommand(iCommand);
  }

  protected handleError(err) {
    this.invalidHints = new Array<string>();
    try {
      this.lastRequestErr = JSON.parse(err.response);
      // Prepare input-invalid-msg
      this.invalidHints.push(
        "ERROR-STATUS " + this.lastRequestErr.status
      );
      const errors = this.lastRequestErr.errors;
      for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const msg = errors[key];
          this.invalidHints.push(msg);
        }
      }    
    } catch (parseErr) {
      console.warn("ERROR: Probably could not parse Request");
      console.error(parseErr);
    } finally {
      if (this.invalidHints.length < 1) {
        this.invalidHints.push("Ein unbekannter Fehler ist aufgetreten!");
      }
    }
  }
}
