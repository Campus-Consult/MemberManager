import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPositionDto, PositionClient, ReactivatePositionCommand } from '../../../../membermanager-api';

@Component({
  selector: 'app-position-reactivate-dialog',
  templateUrl: './position-reactivate-dialog.component.html',
  styleUrls: ['./position-reactivate-dialog.component.scss']
})
export class PositionReactivateDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  position: IPositionDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionReactivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string, position: IPositionDto },
    private positionClient: PositionClient
  ) {

    this.description = data.description;
    this.position = data.position;

  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      endDateTime: new FormControl(null, Validators.required),
    });
  }

  get endDateTime() {
    return this.form.get('endDateTime').value;
  }

  save() {
    this.positionClient.reactivate(this.position.id, new ReactivatePositionCommand({
      id: this.position.id,
    })).subscribe(val => {
      this.dialogRef.close(true);
    }, error => {
      let errors = JSON.parse(error.response);

      // TODO make error component
      if (errors) {
        console.error(errors);
        this.errors = errors.title + ":"
        for (var i = 0; i < errors.errors.Id.length; i++) {
          this.errors += errors.errors.Id[i];
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
