import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SelectOption } from 'src/app/shared/components/search-select/search-select.component';

@Component({
  selector: 'app-member-assign-dialog',
  templateUrl: './member-assign-dialog.component.html',
  styleUrls: ['./member-assign-dialog.component.scss'],
})
export class MemberAssignDialogComponent implements OnInit {
  errors?;
  isSaving = false;
  // TODO: prevent double click

  assignForm: FormGroup;

  get assignDate() {
    return this.assignForm.get('assignDate').value;
  }

  get assignedElement(): SelectOption {
    return this.assignForm.get('assignedElement').value;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: MemberAssignDialogData
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      assignDate: [null, Validators.required],
      assignedElement: [true, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  confirmNewAssign() {
    this.isSaving = true;
    this.data
      .assignCallback(this.assignDate, this.assignedElement.id)
      .subscribe(
        () => {
          this.dialogRef.close(this.assignDate);
        },
        (err) => {
          this.errors = err;
        },
        () => {
          this.isSaving = false;
        }
      );
  }
}

export interface MemberAssignDialogData {
  description: string;
  assignCallback: (
    assignDate: string,
    newAssignedId: number
  ) => Observable<void>;
  assignSelectSuggestions: SelectOption[];
  assignLabel: string;
  assignAction: string;
}
