import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CareerLevelDto } from 'src/app/membermanager-api';
import { MemberStatusAssignDialogComponent } from '../../member-status/components/member-status-assign-dialog/member-status-assign-dialog.component';
import { MemberStatusDismissDialogComponent } from '../../member-status/components/member-status-dismiss-dialog/member-status-dismiss-dialog.component';
import { MemberStatusHistoryDialogComponent } from '../../member-status/components/member-status-history-dialog/member-status-history-dialog.component';
import { CareerLevelAssignee, CareerLevelClient } from './../../../membermanager-api';

@Component({
  selector: 'app-career-level-details',
  templateUrl: './career-level-details.component.html',
  styleUrls: ['./career-level-details.component.scss']
})
export class CareerLevelDetailsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() careerLevelID: number;
  @Output() onReloadRequired = new EventEmitter();

  careerLevel: CareerLevelDto;

  assignees: CareerLevelAssignee[];
  dataSource: MatTableDataSource<CareerLevelAssignee>;
  columns: string[] = ['name', 'since', 'till'];

  constructor(public dialog: MatDialog, private careerLevelClient: CareerLevelClient) { }

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
    this.careerLevelClient.get2(this.careerLevelID).subscribe(result => {
      this.careerLevel = result;
      this.dataSource = new MatTableDataSource<CareerLevelAssignee>(result.assignees);
    });
  }

  onAssignPersonButtonClicked() {

    let dialogRef = this.dialog.open(MemberStatusAssignDialogComponent, {
      data: { description: "Assign to " + this.careerLevel.name, memberStatus: this.careerLevel }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.reloadRequired();
        }
      })
  }

  onDismissPersonButtonClicked() {

    let dialogRef = this.dialog.open(MemberStatusDismissDialogComponent, {
      data: { description: "Dismiss from " + this.careerLevel.name, memberStatus: this.careerLevel }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.reloadRequired();
        }
      })
  }

  onShowHistoryButtonClicked() {

    let dialogRef = this.dialog.open(MemberStatusHistoryDialogComponent, {
      data: { description: "History of " + this.careerLevel.name, memberStatus: this.careerLevel },
      width: '600px',
    });
  }
}
