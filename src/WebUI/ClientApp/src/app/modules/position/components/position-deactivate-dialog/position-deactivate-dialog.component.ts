import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DeactivatePositionCommand,
  IPositionDto,
  PositionClient,
} from '../../../../membermanager-api';

@Component({
  selector: 'app-position-deactivate-dialog',
  templateUrl: './position-deactivate-dialog.component.html',
  styleUrls: ['./position-deactivate-dialog.component.scss'],
})
export class PositionDeactivateDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  position: IPositionDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionDeactivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; position: IPositionDto },
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
    this.positionClient
      .deactivate(
        this.position.id,
        new DeactivatePositionCommand({
          id: this.position.id,
          endDateTime: this.endDateTime,
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
}
