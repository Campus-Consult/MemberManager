import { EventFormComponent, EventFormDialogData } from './../event-form/event-form.component';
import {
  CreateEventCommand,
  EventClient,
  ICreateEventCommand,
  PeopleClient,
  UpdateEventCommand,
} from './../../../membermanager-api';
import { EventCodeDialogComponent } from './../event-code-dialog/event-code-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailDto } from 'src/app/membermanager-api';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.eventClient.get().subscribe((events) => (this.events = events));
  }

  onCreate() {
    // Open Form Dialog
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '450px',
      data: {suggestedTags: ['test'], startingTags: ['VT']} as EventFormDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      const createCommand = result;
      this.eventClient.create(createCommand).subscribe(()=> this._snackBar.open(`${result.name} bearbeitet erstellt!`)
      );
    });
  }

  onEdit(event: EventDetailDto) {
    // Open Form Dialog
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '450px',
      data: {edit: event, suggestedTags: ['test'], startingTags: ['VT']} as EventFormDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.eventClient.update(event.id, result).subscribe(()=> this._snackBar.open(`${result.name} erfolgreich bearbeitet!`), err => this._snackBar.open('Something went wrong.')
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
