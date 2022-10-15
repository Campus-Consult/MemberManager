import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SelectOption } from 'src/app/shared/components/search-select/search-select.component';

@Component({
  selector: 'app-member-reassign-dialog',
  templateUrl: './member-reassign-dialog.component.html',
  styleUrls: ['./member-reassign-dialog.component.scss'],
})
export class MemberReassignDialogComponent implements OnInit {
  errors?;
  isSaving = false;
  // TODO: prevent double click

  reassignForm: FormGroup;

  get reassignDate() {
    return this.reassignForm.get('reassignDate').value;
  }

  get reassignedElement(): SelectOption {
    return this.reassignForm.get('reassignedElement').value;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberReassignDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: MemberReassignDialogData
  ) {}

  ngOnInit(): void {
    console.log(this.data.reassignSelectSuggestions);
    this.reassignForm = this.fb.group({
      reassignDate: [null, Validators.required],
      reassignedElement: [true, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  confirmDismiss() {
    this.isSaving = true;
    this.data
      .reassignCallback(this.reassignDate, this.reassignedElement.id)
      .subscribe(
        () => {
          this.dialogRef.close(this.reassignDate);
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

export interface MemberReassignDialogData {
  description: string;
  reassignCallback: (
    reassignDate: string,
    newAssignedId: number
  ) => Observable<void>;
  reassignSelectSuggestions: SelectOption[];
  reassignLabel: string;
}
