import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-tracking-table',
  templateUrl: './event-tracking-table.component.html',
  styleUrls: ['./event-tracking-table.component.scss']
})
export class EventTrackingTableComponent implements OnInit {

  displayedColumns: string[] = ['eventname', 'tag', 'zusagen', 'qr-code'];

  events: any[]

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Event {
} 
