import { Component, OnInit } from '@angular/core';
import { PositionApiService, Position, PositionEdit } from '../../services/positionapi.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PositionClient, CreatePositionCommand } from 'src/app/membermanager-api';

@Component({
  selector: 'app-position-create-dialog',
  templateUrl: 'position-create-dialog.component.html',
})
export class PositionCreateDialogComponent {

  // track state
  public savingBeforeClose = false;
  public data: PositionEdit;

  constructor(
    private positionClient: PositionClient,
    public dialogRef: MatDialogRef<PositionCreateDialogComponent>) {
      this.savingBeforeClose = false;
      this.data = {
        name: '',
        shortName: '',
        positionID: -1, // ignored by api anyways
      };
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.savingBeforeClose) { return; }
    console.log('saving...');
    this.savingBeforeClose = true;
    this.dialogRef.disableClose = true;
    this.positionClient.create(
      new CreatePositionCommand({
        name: this.data.name,
        shortName: this.data.shortName,
    })).subscribe(val => {
      this.dialogRef.close(this.data);
    }, err => {
      // how do we want to handle errors? Notification top right?
      console.log(err);
      this.dialogRef.close();
    });
  }
}