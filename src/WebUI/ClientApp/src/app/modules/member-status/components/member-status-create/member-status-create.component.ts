import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CreateMemberStatusCommand,
  ICreateMemberStatusCommand,
  MemberStatusClient,
} from '../../../../membermanager-api';

@Component({
  selector: 'app-member-status-create',
  templateUrl: './member-status-create.component.html',
  styleUrls: ['./member-status-create.component.scss'],
})
export class MemberStatusCreateComponent {
  fromData: ICreateMemberStatusCommand;

  errmsg: string;

  constructor(
    public dialogRef: MatDialogRef<MemberStatusCreateComponent>,
    private memberStatusClient: MemberStatusClient
  ) {
    this.fromData = { name: '' };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createMemberStatus() {
    const command = new CreateMemberStatusCommand(this.fromData);
    this.errmsg = '';
    this.memberStatusClient.create(command).subscribe(
      (numberStatus) => {
        this.dialogRef.close(this.fromData);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  disableCreate(): boolean {
    return !this.fromData.name;
  }

  handleError(error) {
    console.error(error);
    if (typeof error == 'string') {
      this.errmsg = error;
    } else {
      this.errmsg = 'Failed to create Member Status';
    }
  }
}
