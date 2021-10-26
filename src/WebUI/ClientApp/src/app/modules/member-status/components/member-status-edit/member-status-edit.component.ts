import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  IUpdateMemberStatusCommand,
  MemberStatusClient,
  UpdateMemberStatusCommand,
} from 'src/app/membermanager-api';
import { MemberStatusDetailVm } from './../../../../membermanager-api';

@Component({
  selector: 'app-member-status-edit',
  templateUrl: './member-status-edit.component.html',
  styleUrls: ['./member-status-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberStatusEditComponent {
  fromData: IUpdateMemberStatusCommand;

  errmsg: string;

  constructor(
    public dialogRef: MatDialogRef<MemberStatusEditComponent>,
    private memberStatusClient: MemberStatusClient,
    @Inject(MAT_DIALOG_DATA) public data: { memberStatus: MemberStatusDetailVm }
  ) {
    this.fromData = {
      memberStatusId: data.memberStatus.id,
      name: data.memberStatus.name,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editMemberStatus() {
    const command = new UpdateMemberStatusCommand(this.fromData);
    this.errmsg = '';
    this.memberStatusClient
      .update(this.data.memberStatus.id, command)
      .subscribe(
        (response) => {
          this.dialogRef.close(this.fromData);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  disableEdit(): boolean {
    return !this.fromData.name;
  }

  handleError(error) {
    console.error(error);
    if (typeof error == 'string') {
      this.errmsg = error;
    } else {
      this.errmsg = 'Failed to edit Member Status';
    }
  }
}
