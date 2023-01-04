import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventAnswerDto, EventClient } from 'src/app/membermanager-api';

@Component({
  selector: 'app-event-attendees-dialog',
  templateUrl: './event-attendees-dialog.component.html',
  styleUrls: ['./event-attendees-dialog.component.scss']
})
export class EventAttendeesDialogComponent implements OnInit {
  public attendees:EventAnswerDto[];
  displayedColumns: string[] = ['name', 'date'];

  constructor(private eventClient: EventClient, @Inject(MAT_DIALOG_DATA) public data: {id: number}) {
    this.eventClient.getSingle(data.id).subscribe((eventObject)=>{
      this.attendees = eventObject.eventAnswers
    })
    console.log(data.id)
   }

  ngOnInit(): void {
  }

}
