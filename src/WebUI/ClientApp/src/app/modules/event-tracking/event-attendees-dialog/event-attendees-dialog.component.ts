import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventAnswerDto, EventClient, EventDetailDto, RemoveEventAnswerCommand } from 'src/app/membermanager-api';

@Component({
  selector: 'app-event-attendees-dialog',
  templateUrl: './event-attendees-dialog.component.html',
  styleUrls: ['./event-attendees-dialog.component.scss']
})
export class EventAttendeesDialogComponent implements OnInit {
  public attendees:EventAnswerDto[];
  displayedColumns: string[] = ['name', 'date', 'delete'];
  event:EventDetailDto;
  
  constructor(private eventClient: EventClient, @Inject(MAT_DIALOG_DATA) public data: {id: number}) {
    this.eventClient.getSingle(data.id).subscribe((eventObject)=>{
      this.attendees = eventObject.eventAnswers?? []
      this.event = eventObject;
    })
    console.log(data.id)
   }

  ngOnInit(): void { 
  }

  attendeeRemove(id:number){
    const cmd = new RemoveEventAnswerCommand({id:id});
    this.eventClient.removeEventAnswer(cmd).subscribe(()=>{
      this.eventClient.getSingle(this.data.id).subscribe((eventObject)=>{
        this.attendees = eventObject.eventAnswers
        this.event = eventObject;
      })
    })
  }

}
