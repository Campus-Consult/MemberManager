import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CreatePersonCommand, ICreatePersonCommand, PeopleClient } from "src/app/membermanager-api";
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

  constructor(public dialogRef: MatDialogRef<CreatePersonComponent>) {}

  ngAfterViewInit() {
    this.memberForm = this.memberFormComp.personalForm;
  }

  /**
   * Results Module returns on close
   */
  getResult(): any {
    console.log("Create Result:");
    console.log(this.memberForm.value);

    return this.memberForm.value;
  }

  onSubmit() {
    const isvalid = this.validateInput();
    this.handleValidation(isvalid);
    if (isvalid) {
      // Modal Output User Input in Modal
      this.dialogRef.close(this.getResult());
    }
  }

  handleValidation(isvalid: boolean) {
    console.warn('handleValidation not implemented');
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }

  validateInput(): boolean {
    return this.memberForm.valid;
  }
}
