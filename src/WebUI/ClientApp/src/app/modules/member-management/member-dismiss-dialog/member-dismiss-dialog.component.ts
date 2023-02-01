import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-dismiss-dialog',
  templateUrl: './member-dismiss-dialog.component.html',
  styleUrls: ['./member-dismiss-dialog.component.scss'],
})
export class MemberDismissDialogComponent implements OnInit {
  errors?;
  isSaving = false;
  // TODO: prevent double click

  dismissForm: FormGroup;

  get dismissalDate() {
    return this.dismissForm.get('dismissalDate').value;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      description: string;
      dismissCallback: (dismissDate: string) => Observable<void>;
    }
  ) {}

  ngOnInit(): void {
    this.dismissForm = this.fb.group({
      dismissalDate: [null, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  confirmDismiss() {
    this.isSaving = true;
    this.data.dismissCallback(this.dismissalDate).subscribe(
      () => {
        this.dialogRef.close(this.dismissalDate);
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
