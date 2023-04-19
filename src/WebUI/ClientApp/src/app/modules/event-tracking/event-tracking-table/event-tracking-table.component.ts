import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  CreateEventCommand,
  EventLookupDto,
  UpdateEventCommand,
} from 'src/app/membermanager-api';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { EventAttendeesDialogComponent } from '../event-attendees-dialog/event-attendees-dialog.component';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';
import {
  EventClient,
  EventLookupDtoWithAnswerCount,
} from './../../../membermanager-api';
import { EventCodeDialogComponent } from './../event-code-dialog/event-code-dialog.component';
import { EventFormDialogData } from './../event-form/event-form.component';

@Component({
  selector: 'app-event-tracking-table',
  templateUrl: './event-tracking-table.component.html',
  styleUrls: ['./event-tracking-table.component.scss'],
})
export class EventTrackingTableComponent implements OnInit {
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.events) this.dataSource.sort = this.sort;
  }

  @ViewChild(DataTableComponent)
  dataTable: DataTableComponent<EventLookupDtoWithAnswerCount>;

  dataSource: MatTableDataSource<EventLookupDtoWithAnswerCount>;

  displayedColumns: string[] = [
    'eventname',
    'date',
    'tag',
    'attendances',
    'qrcode',
  ];

  events: EventLookupDtoWithAnswerCount[];

  constructor(
    protected dialog: MatDialog,
    protected eventClient: EventClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  onCreate() {
    // Open Form Dialog
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      width: '500px',
      data: {
        suggestedTags: ['test'],
        startingTags: ['VT'],
        submitAction: (createCommand: CreateEventCommand) =>
          this.eventClient.create(createCommand),
      } as EventFormDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEvents();
        this._snackBar.open(`${result.name} erstellt!`);
      }
    });
  }

  loadEvents() {
    this.eventClient.get().subscribe((events) => {
      this.events = events;
      this.dataSource = new MatTableDataSource<EventLookupDtoWithAnswerCount>(
        this.events
      );
      this.dataSource.sort = this.sort;
    });
  }

  async openEventDialog(event: EventLookupDtoWithAnswerCount) {
    const eventDetails = await this.eventClient
      .getSingle(event.id)
      .toPromise()
      .then((value) => value);
    const dialogRef = this.dialog.open(EventCodeDialogComponent, {
      width: '750px',
      data: {
        edit: eventDetails,
        suggestedTags: ['test'],
        startingTags: ['VT'],
        submitAction: (result: UpdateEventCommand) =>
          this.eventClient.update(event.id, result),
      } as EventFormDialogData,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.loadEvents();
          this._snackBar.open(`${result?.name} erfolgreich bearbeitet!`);
        }
      },
      (err) => this._snackBar.open('Something went wrong.')
    );
  }
  openAttendeesDialog(row: EventLookupDtoWithAnswerCount) {
    const dialogRef = this.dialog.open(EventAttendeesDialogComponent, {
      width: '750px',
      data: {
        id: row.id,
      },
    });
  }
}
