import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePositionCommand, PositionClient } from '../../../../membermanager-api';

@Component({
  selector: 'app-position-create-dialog',
  templateUrl: './position-create-dialog.component.html',
  styleUrls: ['./position-create-dialog.component.scss']
})
export class PositionCreateDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string },
    private positionClient: PositionClient
  ) {

    this.description = data.description;

  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });
  }

  createForm = this.fb.group({
    name: [null, Validators.required],
    shortName: [null, Validators.required],
  });

  get name() {
    return this.createForm.get('name').value;
  }

  get shortName() {
    return this.createForm.get('shortName').value;
  }

  save() {
    this.positionClient.create(new CreatePositionCommand({
      name: this.name,
      shortName: this.shortName,
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

}
