import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  AssigneeDto,
  IAssigneeDto,
  MemberStatusHistoryVm,
} from 'src/app/membermanager-api';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
})
export class HistoryDialogComponent implements OnInit {
  description: string;
  assignees: IAssigneeDto[] = [];
  assigneeCount: number;
  dataSource: MatTableDataSource<IAssigneeDto>;
  columns: string[] = ['name', 'since', 'till'];

  constructor(
    private dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; assignees: IAssigneeDto[] }
  ) {
    this.description = data.description;
    this.assignees = data.assignees;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<IAssigneeDto>(this.assignees);
    this.assigneeCount = this.assignees.length;
    console.log(this.assignees);
  }

  close() {
    this.dialogRef.close();
  }
}
