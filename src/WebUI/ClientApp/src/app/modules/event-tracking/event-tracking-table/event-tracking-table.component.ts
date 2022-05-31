import { EventCodeDialogComponent } from './../event-code-dialog/event-code-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-tracking-table',
  templateUrl: './event-tracking-table.component.html',
  styleUrls: ['./event-tracking-table.component.scss'],
})
export class EventTrackingTableComponent implements OnInit {
  displayedColumns: string[] = ['eventname', 'tag', 'attendances', 'qrcode'];

  events: any[];

  constructor(protected dialog: MatDialog) {}

  ngOnInit(): void {
    this.events = [];
    for (let index = 0; index < 10; index++) {
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
    }
  }
}

export interface Event {}
