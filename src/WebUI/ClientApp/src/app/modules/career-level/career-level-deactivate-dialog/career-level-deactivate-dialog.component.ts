import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CareerLevelClient,
  CareerLevelDto,
  CareerLevelLookupDto,
  DeactivateCareerLevelCommand,
} from 'src/app/membermanager-api';

@Component({
  selector: 'app-career-level-deactivate-dialog',
  templateUrl: './career-level-deactivate-dialog.component.html',
  styleUrls: ['./career-level-deactivate-dialog.component.scss'],
})
export class CareerLevelDeactivateDialogComponent implements OnInit {
  form: FormGroup;
  errors;

  careerLevelSelection: CareerLevelLookupDto[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CareerLevelDeactivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      description: string;
      careerLevel: CareerLevelDto;
      careerLevelList: CareerLevelLookupDto[];
    },
    private careerLevelClient: CareerLevelClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      endDateTime: new FormControl(null, Validators.required),
      newLevel: new FormControl(null, Validators.required),
    });

    this.careerLevelSelection = this.data.careerLevelList.filter(
      (item) => item.id !== this.data.careerLevel.id
    );
  }

  get endDateTime() {
    return this.form.get('endDateTime').value;
  }

  get newLevel() {
    return this.form.get('newLevel').value;
  }

  save() {
    const command = new DeactivateCareerLevelCommand({
      careerLevelId: this.data.careerLevel.id,
      newCareerLevelId: undefined,
      changeDateTime: this.endDateTime,
    });
    this.careerLevelClient.deactivate(this.data.careerLevel.id, command);
  }

  close() {
    this.dialogRef.close();
  }
}
