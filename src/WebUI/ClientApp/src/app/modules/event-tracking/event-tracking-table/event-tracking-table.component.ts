import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, switchMap } from 'rxjs/operators';
import {
  CreateEventCommand,
  EventLookupDto,
  UpdateEventCommand,
} from 'src/app/membermanager-api';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

import { EventAttendeesDialogComponent } from '../event-attendees-dialog/event-attendees-dialog.component';
import {
  EventClient,
  EventLookupDtoWithAnswerCount,
} from './../../../membermanager-api';
import { EventCodeDialogComponent } from './../event-code-dialog/event-code-dialog.component';
import {
  EventFormComponent,
  EventFormDialogData,
} from './../event-form/event-form.component';

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
    const dialogRef = this.dialog.open(EventFormComponent, {
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
        this._snackBar.open(`${result.name} erstellt!`, 'okay', {
          duration: 3000,
        });
      }
    });
  }

  loadEvents() {
    this.eventClient.get().subscribe((events) => {
      this.events = events;
      // better for change Detection, prevent NG100 Error in Angular Material V 13
      if (this.dataSource) this.dataSource.data = this.events;
      else
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
      data: eventDetails,
    });
  }

  async openEditEventDialog(event: EventLookupDto) {
    const eventDetails = await this.eventClient
      .getSingle(event.id)
      .toPromise()
      .then((value) => value);
    const dialogRef = this.dialog.open(EventFormComponent, {
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
        if (result instanceof UpdateEventCommand) {
          this.loadEvents();
          this._snackBar.open(`${result?.name} erfolgreich bearbeitet!`);
        }
      },
      (err) => this._snackBar.open('Something went wrong.')
    );
  }

  openDeleteDialog(event: EventLookupDto) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      role: 'alertdialog',
      data: { title: `Event löschen?` },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap((result) => this.eventClient.delete(event.id))
      )
      .subscribe((result) => {
        this.loadEvents();
        this._snackBar.open('Event erfolgreich gelöscht!', 'ok', {
          duration: 3000,
        });
      });
  }

  openAttendeesDialog(row: EventLookupDtoWithAnswerCount) {
    const dialogRef = this.dialog.open(EventAttendeesDialogComponent, {
      width: '750px',
      data: {
        id: row.id,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.loadEvents());
  }
}
