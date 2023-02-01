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
import { Observable } from 'rxjs';
import { MemberDismissDialogComponent } from 'src/app/modules/member-management/member-dismiss-dialog/member-dismiss-dialog.component';
import { HistoryDialogComponent } from 'src/app/shared/components/history-dialog/history-dialog.component';
import {
  DismissFromPositionCommand,
  PositionAssignee,
  PositionClient,
  PositionDto,
} from '../../../../membermanager-api';
import { PositionAssignDialogComponent } from '../position-assign-dialog/position-assign-dialog.component';
import { PositionDeactivateDialogComponent } from '../position-deactivate-dialog/position-deactivate-dialog.component';
import { PositionEditDialogComponent } from '../position-edit-dialog/position-edit-dialog.component';
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
  @Input() hideUntilColumn: boolean = false;
  @Output() onReloadRequired = new EventEmitter();

  position: PositionDto;

  dataSource: MatTableDataSource<PositionAssignee>;
  columns: string[] = ['name', 'since', 'till', 'actions'];

  constructor(
    public dialog: MatDialog,
    private positionClient: PositionClient
  ) {}

  ngOnInit(): void {
    if (this.hideUntilColumn) {
      this.columns = this.columns.filter((c) => c != 'till');
    }
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
      this.dataSource = new MatTableDataSource<PositionAssignee>(
        result.assignees
      );
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

  onPersonDismissClicked(element: PositionAssignee) {
    console.log(element);
    this.dialog
      .open(MemberDismissDialogComponent, {
        role: 'alertdialog',
        width: '250px',
        data: {
          description: `${element.firstName ?? ''} ${
            element.surname ?? ''
          } von Posten ${this.position.name} entfernen?`,
          dismissCallback: (dismissalDate: string): Observable<any> => {
            return this.positionClient.dismiss(
              this.positionID,
              new DismissFromPositionCommand({
                dismissalDateTime: dismissalDate,
                personId: element.personId,
                positionId: this.positionID,
              })
            );
          },
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.reloadRequired();
        }
      });
  }

  onShowHistoryButtonClicked() {
    this.positionClient.getHistory(this.position.id).subscribe(
      (result) => {
        this.dialog.open(HistoryDialogComponent, {
          data: {
            description: 'History of ' + this.position.name,
            assignees: result.assignees,
          },
          width: '600px',
        });
      },
      (error) => console.error(error)
    );
  }
}
