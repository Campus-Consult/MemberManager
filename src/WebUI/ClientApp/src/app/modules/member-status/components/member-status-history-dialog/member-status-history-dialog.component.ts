import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {
  MemberStatusClient,
  MemberStatusLookupDto,
  MemberStatusHistoryVm,
  AssigneeDto,
} from '../../../../membermanager-api';

@Component({
  selector: 'app-member-status-history-dialog',
  templateUrl: './member-status-history-dialog.component.html',
  styleUrls: ['./member-status-history-dialog.component.scss'],
})
export class MemberStatusHistoryDialogComponent implements OnInit {
  description: string;

  memberStatus: MemberStatusLookupDto;
  history: MemberStatusHistoryVm;
  assignees: AssigneeDto[];
  dataSource: MatTableDataSource<AssigneeDto>;
  columns: string[] = ['name', 'since', 'till'];

  constructor(
    private dialogRef: MatDialogRef<MemberStatusHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; memberStatus: MemberStatusLookupDto },
    private memberStatusClient: MemberStatusClient
  ) {
    this.description = data.description;
    this.memberStatus = data.memberStatus;
  }

  ngOnInit() {
    this.fetchHistory();
  }

  close() {
    this.dialogRef.close();
  }

  fetchHistory() {
    this.memberStatusClient.getHistory(this.memberStatus.id).subscribe(
      (result) => {
        this.history = result;
        this.dataSource = new MatTableDataSource<AssigneeDto>(result.assignees);
      },
      (error) => console.error(error)
    );
  }
}
