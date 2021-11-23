import { MemberStatusEditDialogComponent, MemberStatusEditDialogData } from '../member-status-edit-dialog/member-status-edit-dialog.component';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  AssigneeDto,
  MemberStatusClient,
  MemberStatusDetailVm,
} from '../../../../membermanager-api';
import { MemberStatusAssignDialogComponent } from '../member-status-assign-dialog/member-status-assign-dialog.component';
import { MemberStatusDismissDialogComponent } from '../member-status-dismiss-dialog/member-status-dismiss-dialog.component';
import { MemberStatusHistoryDialogComponent } from '../member-status-history-dialog/member-status-history-dialog.component';

@Component({
  selector: 'app-member-status-details',
  templateUrl: './member-status-details.component.html',
  styleUrls: ['./member-status-details.component.scss'],
})
export class MemberStatusDetailsComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() memberStatusID: number;
  @Output() onReloadRequired = new EventEmitter();

  memberStatus: MemberStatusDetailVm;

  assignees: AssigneeDto[];
  dataSource: MatTableDataSource<AssigneeDto>;
  columns: string[] = ['name', 'since', 'till'];

  constructor(
    public dialog: MatDialog,
    private memberStatusClient: MemberStatusClient
  ) {}

  ngOnInit(): void {
    this.fetchMemberStatusDetails();
  }

  ngAfterViewInit(): void {
    this.fetchMemberStatusDetails();
  }

  ngOnChanges(): void {
    this.fetchMemberStatusDetails();
  }

  reload(): void {
    this.fetchMemberStatusDetails();
  }

  private reloadRequired(): void {
    // check if parent is bound
    if (this.onReloadRequired.observers.length > 0) {
      this.onReloadRequired.emit();
    } else {
      this.reload();
    }
  }

  private fetchMemberStatusDetails() {
    this.memberStatusClient.get2(this.memberStatusID).subscribe((result) => {
      this.memberStatus = result;
      this.dataSource = new MatTableDataSource<AssigneeDto>(result.assignees);
    });
  }

  onAssignPersonButtonClicked() {
    const dialogRef = this.dialog.open(MemberStatusAssignDialogComponent, {
      data: {
        description: 'Assign to ' + this.memberStatus.name,
        memberStatus: this.memberStatus,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadRequired();
      }
    });
  }

  onDismissPersonButtonClicked() {
    const disabled = this.memberStatus?.assignees.length !== 0;
    if (disabled) {
      const dialogRef = this.dialog.open(MemberStatusDismissDialogComponent, {
        data: {
          description: 'Dismiss from ' + this.memberStatus.name,
          memberStatus: this.memberStatus,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.reloadRequired();
        }
      });
    } else {
      alert('Nothing to dismiss');
    }
  }

  onShowHistoryButtonClicked() {
    const dialogRef = this.dialog.open(MemberStatusHistoryDialogComponent, {
      data: {
        description: 'History of ' + this.memberStatus.name,
        memberStatus: this.memberStatus,
      },
      width: '600px',
    });
  }

  onEditButtonClicked() {
    const dialogRef = this.dialog.open(MemberStatusEditDialogComponent, {
      data: {
        memberStatusId: this.memberStatus.id,
        name: this.memberStatus.name
      } as MemberStatusEditDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadRequired();
      }
    });
  }
}
