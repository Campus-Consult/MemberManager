import { CareerLevelAssignDialogComponent } from './../career-level-assign-dialog/career-level-assign-dialog.component';
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
import { CareerLevelDto } from 'src/app/membermanager-api';
import {
  CareerLevelAssignee,
  CareerLevelClient,
} from './../../../membermanager-api';
import { CareerLevelDismissDialogComponent } from '../career-level-dismiss-dialog/career-level-dismiss-dialog.component';
import { CreateCareerLevelDialogComponent } from '../create-career-level-dialog/create-career-level-dialog.component';
import { HistoryDialogComponent } from 'src/app/shared/components/history-dialog/history-dialog.component';

@Component({
  selector: 'app-career-level-details',
  templateUrl: './career-level-details.component.html',
  styleUrls: ['./career-level-details.component.scss'],
})
export class CareerLevelDetailsComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() careerLevelID: number;
  @Output() onReloadRequired = new EventEmitter();

  careerLevel: CareerLevelDto;

  assignees: CareerLevelAssignee[];
  dataSource: MatTableDataSource<CareerLevelDto>;
  columns: string[] = ['name', 'since'];

  constructor(
    public dialog: MatDialog,
    private careerLevelClient: CareerLevelClient
  ) {}

  ngOnInit(): void {
    this.fetchCareerLevelDetails();
  }

  ngAfterViewInit(): void {
    this.fetchCareerLevelDetails();
  }

  ngOnChanges(): void {
    this.fetchCareerLevelDetails();
  }

  reload(): void {
    this.fetchCareerLevelDetails();
  }

  private reloadRequired(): void {
    // check if parent is bound
    if (this.onReloadRequired.observers.length > 0) {
      this.onReloadRequired.emit();
    } else {
      this.reload();
    }
  }

  private fetchCareerLevelDetails() {
    this.careerLevelClient.get2(this.careerLevelID).subscribe((result) => {
      this.careerLevel = result;
      this.dataSource = new MatTableDataSource<CareerLevelDto>(
        result.assignees
      );
    });
  }

  onAssignPersonButtonClicked() {
    let dialogRef = this.dialog.open(CareerLevelAssignDialogComponent, {
      data: {
        description: 'Assign to ' + this.careerLevel.name,
        careerLevel: this.careerLevel,
      },
    });

    const sub = dialogRef.afterClosed().subscribe((result) => {
      this.reloadRequired();
      sub.unsubscribe();
    });
  }

  onDismissPersonButtonClicked() {
    let dialogRef = this.dialog.open(CareerLevelDismissDialogComponent, {
      data: {
        description: 'Dismiss from ' + this.careerLevel.name,
        careerLevel: this.careerLevel,
      },
    });

    const sub = dialogRef.afterClosed().subscribe((result) => {
      this.reloadRequired();
      sub.unsubscribe();
    });
  }

  onEditButtonClicked() {
    let dialogRef = this.dialog.open(CreateCareerLevelDialogComponent, {
      data: {
        description: 'Edit ' + this.careerLevel.name,
        careerLevel: this.careerLevel,
      },
    });

    const sub = dialogRef.afterClosed().subscribe((result) => {
      this.reload();
      sub.unsubscribe();
    });
  }

  onShowHistoryButtonClicked() {
    this.careerLevelClient.getHistory(this.careerLevel.id).subscribe(
      (result) => {
        this.dialog.open(HistoryDialogComponent, {
          data: {
            description: 'History of ' + this.careerLevel.name,
            assignees: result.assignees,
          },
          width: '600px',
        });
      },
      (error) => console.error(error)
    );
  }
}
