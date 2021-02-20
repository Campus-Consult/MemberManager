import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { AssigneeDto, PositionClient, PositionDto } from '../../../../membermanager-api';
import { PositionAssignDialogComponent } from '../position-assign-dialog/position-assign-dialog.component';
import { PositionDismissDialogComponent } from '../position-dismiss-dialog/position-dismiss-dialog.component';
import { PositionHistoryDialogComponent } from '../position-history-dialog/position-history-dialog.component';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.scss']
})
export class PositionDetailsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() positionID: number;
  @Output() onReloadRequired = new EventEmitter();

  position: PositionDto;

  assignees: AssigneeDto[];
  dataSource: MatTableDataSource<AssigneeDto>;
  columns: string[] = ['name', 'since', 'till'];

  constructor(public dialog: MatDialog, private positionClient: PositionClient) { }

  ngOnInit(): void {
    this.fetchPositionDetails();
  }

  ngAfterViewInit(): void {
    this.fetchPositionDetails();
  }

  ngOnChanges(): void {
    this.fetchPositionDetails();
  }

  reload(): void {
    this.fetchPositionDetails();
  }

  private reloadRequired(): void {
    // check if parent is bound
    if (this.onReloadRequired.observers.length > 0) {
      this.onReloadRequired.emit();
    } else {
      this.reload();
    }
  }

  private fetchPositionDetails() {
    this.positionClient.get2(this.positionID, false).subscribe(result => {
      this.position = result;
      this.dataSource = new MatTableDataSource<AssigneeDto>(result.assignees);
    });
  }

  private onAssignPersonButtonClicked() {

    let dialogRef = this.dialog.open(PositionAssignDialogComponent, {
      data: { description: "Assign to " + this.position.name, position: this.position }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.reloadRequired();
        }
      })
  }

  private onDismissPersonButtonClicked() {

    let dialogRef = this.dialog.open(PositionDismissDialogComponent, {
      data: { description: "Dismiss from " + this.position.name, position: this.position }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.reloadRequired();
        }
      })
  }

  private onShowHistoryButtonClicked() {

    let dialogRef = this.dialog.open(PositionHistoryDialogComponent, {
      data: { description: "History of " + this.position.name, position: this.position },
      width: '600px',
    });
  }
}
