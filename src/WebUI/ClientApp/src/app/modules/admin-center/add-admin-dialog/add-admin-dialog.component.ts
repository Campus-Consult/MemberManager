import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddAdminUserCommand, AdminClient, FileResponse } from 'src/app/membermanager-api';

@Component({
  templateUrl: './add-admin-dialog.component.html',
  styleUrls: ['./add-admin-dialog.component.scss']
})
export class AddAdminDialogComponent {

  email = '';

  constructor(
    protected adminClient: AdminClient,
    public dialogRef: MatDialogRef<AddAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}

  
  addAdmin() {
    const command: AddAdminUserCommand = new AddAdminUserCommand({
      email: this.email,
    });
    this.adminClient.addAdmin(command).subscribe(()=>{
      this.dialogRef.close(this.email);
    }, (error)=> console.error(error));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
