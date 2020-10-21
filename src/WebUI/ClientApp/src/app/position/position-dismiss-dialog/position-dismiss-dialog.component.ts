import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PositionClient, PositionAssignee, PositionLookupDto, DismissPositionCommand } from 'src/app/membermanager-api';

@Component({
  selector: 'app-position-dismiss-dialog',
  templateUrl: 'position-dismiss-dialog.component.html',
})
export class PositionDismissDialogComponent implements OnInit{
  // track state
  public savingBeforeClose = false;

  constructor(
    private formBuilder: FormBuilder,
    private positionClient: PositionClient,
    public dialogRef: MatDialogRef<PositionDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {position: PositionLookupDto, person: PositionAssignee}) {
      this.savingBeforeClose = false;
  }

  ngOnInit(): void {
    this.date.setValue(new Date());
    this.date.valueChanges.subscribe(v => {
      console.log(v);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dismissForm = this.formBuilder.group({
    date: [null, Validators.required],
  });

  get date() {
    return this.dismissForm.get('date');
  }

  onSubmit(): void {
    if (this.savingBeforeClose) { return; }
    // triggers errors
    this.dismissForm.markAllAsTouched();
    if (this.dismissForm.invalid) { return; }
    console.log('saving...');
    this.savingBeforeClose = true;
    this.dialogRef.disableClose = true;

    this.positionClient.dismiss(this.data.position.id, new DismissPositionCommand({
      id: this.data.position.id,
      personId: this.data.person.id,
      dismissDateTime: this.date.value,
    })).subscribe(val => {
      this.dialogRef.close();
    }, err => {
      // how do we want to handle errors? Notification top right?
      console.log(err);
      this.dialogRef.close();
    });
  }
}