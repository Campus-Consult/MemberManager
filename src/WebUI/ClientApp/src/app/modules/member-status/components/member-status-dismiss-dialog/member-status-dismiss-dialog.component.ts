import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DismissFromMemberStatusCommand,
  MemberStatusClient,
  MemberStatusLookupDto,
} from '../../../../membermanager-api';
import { SelectOption } from '../../../../shared/components/search-select/search-select.component';

@Component({
  selector: 'app-member-status-dismiss-dialog',
  templateUrl: './member-status-dismiss-dialog.component.html',
  styleUrls: ['./member-status-dismiss-dialog.component.scss'],
})
export class MemberStatusDismissDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  suggestions: SelectOption[];

  memberStatus: MemberStatusLookupDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberStatusDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; memberStatus: MemberStatusLookupDto },
    private memberStatusClient: MemberStatusClient
  ) {
    this.description = data.description;
    this.memberStatus = data.memberStatus;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
    });

    this.fetchSuggestions();
  }

  dismissForm = this.fb.group({
    dismissedPerson: [true, Validators.required],
    dismissalDate: [null, Validators.required],
  });

  get dismissedPerson() {
    return this.dismissForm.get('dismissedPerson').value;
  }

  get dismissalDate() {
    return this.dismissForm.get('dismissalDate').value;
  }

  save() {
    this.memberStatusClient
      .dismiss(
        this.memberStatus.id,
        new DismissFromMemberStatusCommand({
          dismissalDateTime: this.dismissalDate,
          memberStatusId: this.memberStatus.id,
          personId: this.dismissedPerson.id,
        })
      )
      .subscribe(
        (val) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.errors = error;
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

  fetchSuggestions() {
    this.memberStatusClient
      .getDismissSuggestions(this.memberStatus.id)
      .subscribe(
        (suggestions) => {
          this.suggestions = suggestions.suggestions.map((s) => {
            return { name: s.name, id: s.id };
          });
        },
        (error) => console.error(error)
      );
  }
}
