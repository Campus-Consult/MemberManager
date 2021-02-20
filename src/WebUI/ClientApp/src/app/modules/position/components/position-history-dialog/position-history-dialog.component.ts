import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { PositionClient, PositionLookupDto, PositionsHistoryVm, AssigneeDto } from '../../../../membermanager-api';

@Component({
  selector: 'app-position-history-dialog',
  templateUrl: './position-history-dialog.component.html',
  styleUrls: ['./position-history-dialog.component.scss']
})
export class PositionHistoryDialogComponent implements OnInit {

  description: string;

  position: PositionLookupDto;
  history: PositionsHistoryVm;
  assignees: AssigneeDto[];
  dataSource: MatTableDataSource<AssigneeDto>;
  columns: string[] = ['name', 'since', 'till'];


  constructor(
    private dialogRef: MatDialogRef<PositionHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string, position: PositionLookupDto },
    private positionClient: PositionClient
  ) {

    this.description = data.description;
    this.position = data.position;    
  }

  ngOnInit() {    
    this.fetchHistory();
  }

  close() {
    this.dialogRef.close();
  }

  fetchHistory() {
    this.positionClient.getHistory(this.position.id).subscribe(
      result => {
        this.history = result;
        this.dataSource = new MatTableDataSource<AssigneeDto>(result.assignees);
      },
      error => console.error(error)
    );
  }
}
