import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './add-admin-dialog.component.html',
  styleUrls: ['./add-admin-dialog.component.scss']
})
export class AddAdminDialogComponent {

  email = '';

  constructor(
    public dialogRef: MatDialogRef<AddAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
