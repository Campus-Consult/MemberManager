import { Component, OnInit, Inject } from '@angular/core';
import { PositionApiService, Position, PositionEdit, PositionHolder } from '../../services/positionapi.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PositionClient } from 'src/app/membermanager-api';

@Component({
  selector: 'app-position-edit-dialog',
  templateUrl: 'position-edit-dialog.component.html',
})
export class PositionEditDialogComponent {

  // track state
  public savingBeforeClose = false;

  constructor(
    private positionClient: PositionClient,
    public dialogRef: MatDialogRef<PositionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PositionEdit) {
      this.savingBeforeClose = false;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.savingBeforeClose) { return; }
    console.log('saving...');
    this.savingBeforeClose = true;
    this.dialogRef.disableClose = true;
    this.dialogRef.close();
    // TODO!
    // this.positionApiService.update(this.data).subscribe(val => {
    //   this.dialogRef.close(this.data);
    // }, err => {
    //   // how do we want to handle errors? Notification top right?
    //   console.log(err);
    //   this.dialogRef.close();
    // });
  }
}