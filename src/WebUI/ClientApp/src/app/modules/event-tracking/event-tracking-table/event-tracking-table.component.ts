import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventDetailDto } from 'src/app/membermanager-api';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';
import { EventClient } from './../../../membermanager-api';
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
  displayedColumns: string[] = [
    'eventname',
    'date',
    /*'tag',*/ 'attendances',
    'qrcode',
  ];

  events: EventDetailDto[];

  constructor(
    protected dialog: MatDialog,
    protected eventClient: EventClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eventClient.get().subscribe((events) => {
      this.events = events;
    });
  }

  onCreate() {
    // Open Form Dialog
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      width: '450px',
      // height: '700px',
      data: {
        suggestedTags: ['test'],
        startingTags: ['VT'],
      } as EventFormDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const createCommand = result;
        this.eventClient.create(createCommand).subscribe(
          () => {
            this.eventClient
              .get()
              .subscribe((events) => (this.events = events));
            this._snackBar.open(`${result.name} erstellt!`);
          },
          (err) => console.error(err)
        );
      }
    });
  }

  onEdit(event: EventDetailDto) {
    // Open Form Dialog
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '450px',
      data: {
        edit: event,
        suggestedTags: ['test'],
        startingTags: ['VT'],
      } as EventFormDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.eventClient.update(event.id, result).subscribe(
        () => this._snackBar.open(`${result.name} erfolgreich bearbeitet!`),
        (err) => this._snackBar.open('Something went wrong.')
      );
    });
  }

  openEventDialog(event: EventDetailDto) {
    const dialogRef = this.dialog.open(EventCodeDialogComponent, {
      width: '650px',
      data: event,
    });

    dialogRef.afterClosed().subscribe();
  }
}

export interface Event {}
