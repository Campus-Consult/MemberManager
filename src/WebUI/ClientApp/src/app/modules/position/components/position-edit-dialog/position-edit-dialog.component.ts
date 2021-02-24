import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPositionDto, PositionClient, UpdatePositionCommand } from '../../../../membermanager-api';

@Component({
  selector: 'app-position-edit-dialog',
  templateUrl: './position-edit-dialog.component.html',
  styleUrls: ['./position-edit-dialog.component.scss']
})
export class PositionEditDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  position: IPositionDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string, position: IPositionDto },
    private positionClient: PositionClient
  ) {

    this.description = data.description;
    this.position = data.position;

  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      name: [this.position.name, Validators.required],
      shortName: [this.position.shortName, Validators.required],
    });
  }  

  get name() {
    return this.form.get('name').value;
  }

  get shortName() {
    return this.form.get('shortName').value;
  }

  save() {
    this.positionClient.update(this.position.id, new UpdatePositionCommand({
      id: this.position.id,
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
        this.errors += errors.errors;
      }
      else {
        console.error(error);
      }

    });
  }

  reactivate() {
    this.dialogRef.close("reactivate");
  }

  deactivate() {
    this.dialogRef.close("deactivate");
  }

  close() {
    this.dialogRef.close();
  }

}
