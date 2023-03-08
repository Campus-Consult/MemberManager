import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DismissSave } from 'src/app/shared/components/dismiss-dialog/dismiss-dialog.component';
import {
  AssigneeDto,
  ChangePersonMemberStatusCommand,
  DismissFromMemberStatusCommand,
  MemberStatusClient,
  MemberStatusDetailVm,
  MemberStatusLookupDto,
} from '../../../../membermanager-api';
import { SelectOption } from '../../../../shared/components/search-select/search-select.component';

@Component({
  selector: 'app-member-status-dismiss-dialog',
  templateUrl: './member-status-dismiss-dialog.component.html',
  styleUrls: ['./member-status-dismiss-dialog.component.scss'],
})
export class MemberStatusDismissDialogComponent implements OnInit {
  description: string;

  suggestions: SelectOption[];

  reassignSuggestions: SelectOption[];

  memberStatus: MemberStatusDetailVm;

  errors;

  constructor(
    private dialogRef: MatDialogRef<MemberStatusDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: {
      description: string;
      memberStatus: MemberStatusDetailVm;
    },
    private memberStatusClient: MemberStatusClient
  ) {
    this.description = data.description;
    this.memberStatus = data.memberStatus;
  }

  ngOnInit() {
    this.suggestions = this.memberStatus.assignees.map((s) => {
      return { name: s.name, id: s.personId };
    });
    this.fetchReassignSuggestions();
  }

  save(dismissEvent: DismissSave) {
    this.memberStatusClient
      .changePersonMemberStatus(
        new ChangePersonMemberStatusCommand({
          changeDateTime: dismissEvent.dismissalDate,
          memberStatusId: dismissEvent.reassignElement.id,
          personId: dismissEvent.dismissedElement.id,
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

  fetchReassignSuggestions() {
    this.memberStatusClient.get().subscribe(
      (suggestions) => {
        this.reassignSuggestions = suggestions.memberStatus.map((s) => {
          return { name: s.name, id: s.id };
        });
      },
      (error) => console.error(error)
    );
  }
}
