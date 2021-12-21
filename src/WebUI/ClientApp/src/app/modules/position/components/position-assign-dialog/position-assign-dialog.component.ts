import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AssignToPositionCommand,
  PositionClient,
  PositionLookupDto,
} from '../../../../membermanager-api';
import { SelectOption } from '../../../../shared/components/search-select/search-select.component';

@Component({
  selector: 'app-position-assign-dialog',
  templateUrl: './position-assign-dialog.component.html',
  styleUrls: ['./position-assign-dialog.component.scss'],
})
export class PositionAssignDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  suggestions: SelectOption[];

  position: PositionLookupDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; position: PositionLookupDto },
    private positionClient: PositionClient
  ) {
    this.description = data.description;
    this.position = data.position;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
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
    this.positionClient
      .assign(
        this.position.id,
        new AssignToPositionCommand({
          assignmentDateTime: this.assignDate,
          positionId: this.position.id,
          personId: this.assignPerson.id,
        })
      )
      .subscribe(
        (val) => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error(error);
          this.errors = error;
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

  fetchSuggestions() {
    this.positionClient.getAssignSuggestions(this.position.id).subscribe(
      (suggestions) => {
        this.suggestions = suggestions.suggestions.map((s) => {
          return { name: s.name, id: s.id };
        });
      },
      (error) => console.error(error)
    );
  }
}
