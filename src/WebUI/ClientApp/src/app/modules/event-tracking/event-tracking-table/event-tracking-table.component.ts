import {
  CreateEventCommand,
  EventClient,
  ICreateEventCommand,
  UpdateEventCommand,
} from './../../../membermanager-api';
import { EventCodeDialogComponent } from './../event-code-dialog/event-code-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailDto } from 'src/app/membermanager-api';

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
    protected eventClient: EventClient
  ) {}

  ngOnInit(): void {
    this.eventClient.get().subscribe((events) => (this.events = events));

    /*  for (let index = 0; index < 10; index++) {
      this.events.push({
        eventname: "Eventname" + index,
        tag: 'VT',
        attendances: index,
        qrCode: "abcdefg"
      });
    }
    for (let index = 0; index < 5; index++) {
      this.events.push({
        eventname: "MV" + index,
        tag: 'MV',
        attendances: index,
        qrCode: "abcdefg"
      });
    } */
  }

  onCreate() {
    // Open Form Dialog

    const command = new CreateEventCommand({});
    this.eventClient.create(command);
  }

  onEdit() {
    // Open Form Dialog
    const id = 0
    const command = new UpdateEventCommand({});
    this.eventClient.update(id, command);
  }

  openEventDialog(event: EventDetailDto) {
    const dialogRef = this.dialog.open(EventCodeDialogComponent, {
      width: '650px',
      data: event,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

export interface Event {}
