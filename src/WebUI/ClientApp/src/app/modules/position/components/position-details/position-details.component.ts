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
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {
  AssigneeDto,
  PositionClient,
  PositionDto,
} from '../../../../membermanager-api';
import { PositionAssignDialogComponent } from '../position-assign-dialog/position-assign-dialog.component';
import { PositionDeactivateDialogComponent } from '../position-deactivate-dialog/position-deactivate-dialog.component';
import { PositionDismissDialogComponent } from '../position-dismiss-dialog/position-dismiss-dialog.component';
import { PositionEditDialogComponent } from '../position-edit-dialog/position-edit-dialog.component';
import { PositionHistoryDialogComponent } from '../position-history-dialog/position-history-dialog.component';
import { PositionReactivateDialogComponent } from '../position-reactivate-dialog/position-reactivate-dialog.component';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.scss'],
})
export class PositionDetailsComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() positionID: number;
  @Output() onReloadRequired = new EventEmitter();

  position: PositionDto;

  assignees: AssigneeDto[];
  dataSource: MatTableDataSource<AssigneeDto>;
  columns: string[] = ['name', 'since', 'till'];

  constructor(
    public dialog: MatDialog,
    private positionClient: PositionClient
  ) {}

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
    this.positionClient.get2(this.positionID, false).subscribe((result) => {
      this.position = result;
      this.dataSource = new MatTableDataSource<AssigneeDto>(result.assignees);
    });
  }

  public onEditButtonClicked() {
    let dialogRef = this.dialog.open(PositionEditDialogComponent, {
      width: '300px',
      data: {
        description: 'Edit ' + this.position.name,
        position: this.position,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deactivate') {
        this.onDeactivateButtonClicked();
      } else if (result === 'reactivate') {
        this.onReactivateButtonClicked();
      } else if (result) {
        this.reloadRequired();
      }
    });
  }

  private onDeactivateButtonClicked() {
    let dialogRef = this.dialog.open(PositionDeactivateDialogComponent, {
      width: '300px',
      data: {
        description: 'Deactivate ' + this.position.name,
        position: this.position,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadRequired();
      }
    });
  }

  private onReactivateButtonClicked() {
    let dialogRef = this.dialog.open(PositionReactivateDialogComponent, {
      width: '300px',
      data: {
        description: 'Reactivate ' + this.position.name,
        position: this.position,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadRequired();
      }
    });
  }

  onAssignPersonButtonClicked() {
    let dialogRef = this.dialog.open(PositionAssignDialogComponent, {
      width: '300px',
      data: {
        description: 'Assign to ' + this.position.name,
        position: this.position,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadRequired();
      }
    });
  }

  onDismissPersonButtonClicked() {
    let dialogRef = this.dialog.open(PositionDismissDialogComponent, {
      width: '300px',
      data: {
        description: 'Dismiss from ' + this.position.name,
        position: this.position,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadRequired();
      }
    });
  }

  onShowHistoryButtonClicked() {
    let dialogRef = this.dialog.open(PositionHistoryDialogComponent, {
      data: {
        description: 'History of ' + this.position.name,
        position: this.position,
      },
      width: '600px',
    });
  }
}
