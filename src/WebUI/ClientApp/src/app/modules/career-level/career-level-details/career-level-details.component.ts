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
import { HistoryDialogComponent } from 'src/app/shared/components/history-dialog/history-dialog.component';

import { CareerLevelDeactivateDialogComponent } from '../career-level-deactivate-dialog/career-level-deactivate-dialog.component';
import { CareerLevelDismissDialogComponent } from '../career-level-dismiss-dialog/career-level-dismiss-dialog.component';
import { CreateCareerLevelDialogComponent } from '../create-career-level-dialog/create-career-level-dialog.component';
import {
  CareerLevelAssignee,
  CareerLevelClient,
} from './../../../membermanager-api';
import { CareerLevelAssignDialogComponent } from './../career-level-assign-dialog/career-level-assign-dialog.component';

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

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadRequired();
    });
  }

  onDismissPersonButtonClicked() {
    let dialogRef = this.dialog.open(CareerLevelDismissDialogComponent, {
      data: {
        description: 'Dismiss from ' + this.careerLevel.name,
        careerLevel: this.careerLevel,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadRequired();
    });
  }

  onEditButtonClicked() {
    let dialogRef = this.dialog.open(CreateCareerLevelDialogComponent, {
      data: {
        description: 'Edit ' + this.careerLevel.name,
        careerLevel: this.careerLevel,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deactivate') this.deactivateLevel(this.careerLevel);
      else if (result === 'reactivate') this.reactivateLevel(this.careerLevel);
      else this.reload();
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

  deactivateLevel(careerLevel: CareerLevelDto) {
    this.careerLevelClient.get().subscribe((clVm) => {
      const dialogRef = this.dialog.open(CareerLevelDeactivateDialogComponent, {
        width: '300px',
        data: {
          description: 'Test',
          careerLevel: careerLevel,
          careerLevelList: clVm.careerLevels.filter((item) => item.isActive),
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result)
          this.careerLevelClient
            .deactivate(this.careerLevel.id, result)
            .subscribe(() => this.reloadRequired());
      });
    });
  }

  reactivateLevel(careerLevel: CareerLevelDto) {
    this.careerLevelClient
      .reactivate(careerLevel.id)
      .subscribe(() => this.reloadRequired());
  }
}
