import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignMemberStatusCommand, MemberStatusClient, MemberStatusLookupDto } from '../../../../membermanager-api';
import { SelectOption } from '../../../../shared/components/search-select/search-select.component';

@Component({
  selector: 'app-member-status-assign-dialog',
  templateUrl: './member-status-assign-dialog.component.html',
  styleUrls: ['./member-status-assign-dialog.component.scss']
})
export class MemberStatusAssignDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  suggestions: SelectOption[];

  memberStatus: MemberStatusLookupDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberStatusAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string, memberStatus: MemberStatusLookupDto },
    private memberStatusClient: MemberStatusClient
  ) {

    this.description = data.description;
    this.memberStatus = data.memberStatus;
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });

    this.fetchSuggestions();
  }

  assignForm = this.fb.group({
    assignPerson: [true, Validators.required],
    assignDate: [null, Validators.required],
  });

  get assignPerson() {
    return this.assignForm.get('assignPerson').value;
  }

  get assignDate() {
    return this.assignForm.get('assignDate').value;
  }

  save() {
    this.memberStatusClient.assign(this.memberStatus.id, new AssignMemberStatusCommand({
      assignmentDateTime: this.assignDate,
      id: this.memberStatus.id,
      personId: this.assignPerson.id,
    })).subscribe(val => {
      this.dialogRef.close(true);
    }, error => {
        let errors = JSON.parse(error.response);

        // TODO make error component
        if (errors) {
          console.error(errors);
          this.errors = errors.title + ":"

          for (var i = 0; i < errors.errors.PersonId.length; i++) {
            this.errors += errors.errors.PersonId[i];
          }
        }
        else {
          console.error(error);
        }

    });
  }

  close() {
    this.dialogRef.close();
  }

  fetchSuggestions() {
    this.memberStatusClient.getAssignSuggestions(this.memberStatus.id).subscribe(
      suggestions => {
        this.suggestions = suggestions.suggestions.map(s => {
          return { name: s.name, id: s.id };
        });
      },
      error => console.error(error)
    );
  }
}
