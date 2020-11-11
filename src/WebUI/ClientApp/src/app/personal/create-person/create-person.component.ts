import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
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
   * @override
   * Called onSubmit
   * Returns modal result value
   */
  getResult(): any{
    console.log('Create Result:');
    console.log(this.memberForm.value);
    
    return this.memberForm.value;
  }

  onSubmit() {
    const isvalid = this.validateInput();
    if (isvalid) {
      // Modal Output User Input in Modal
      this.dialogRef.close(this.getResult());
    }
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }

  validateInput(): boolean {
    return this.memberForm.valid;
  }
}
