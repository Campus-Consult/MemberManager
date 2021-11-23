import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  IUpdateMemberStatusCommand,
  MemberStatusClient,
  UpdateMemberStatusCommand,
} from 'src/app/membermanager-api';

export interface MemberStatusEditDialogData extends IUpdateMemberStatusCommand {
  errorMessage?: string;
}


@Component({
  selector: 'app-member-status-edit-dialog',
  templateUrl: './member-status-edit-dialog.component.html',
  styleUrls: ['./member-status-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberStatusEditDialogComponent {

  constructor(
    public cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<MemberStatusEditDialogComponent>,
    private memberStatusClient: MemberStatusClient,
    @Inject(MAT_DIALOG_DATA) public data: MemberStatusEditDialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editMemberStatus() {
    const command = new UpdateMemberStatusCommand(this.data);
    this.dialogRef.componentInstance.data.errorMessage = '';
    this.memberStatusClient
      .update(this.data.memberStatusId, command)
      .subscribe(
        (response) => {
          this.dialogRef.close(this.data);
        },
        (error) => {
          this.handleError(error);
          this.cdr.detectChanges();
        }
      );
  }

  disableEdit(): boolean {
    return !this.data.name;
  }

  handleError(error) {
    console.error(error);
    if (typeof error === 'string') {
      this.dialogRef.componentInstance.data.errorMessage = error;
    } else {
      this.dialogRef.componentInstance.data.errorMessage = 'Failed to edit Member Status';
    }
  }
}
