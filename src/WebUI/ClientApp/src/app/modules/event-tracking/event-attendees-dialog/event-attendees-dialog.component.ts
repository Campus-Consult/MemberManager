import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AddEventAnswerCommand,
  EventAnswerDto,
  EventClient,
  EventDetailDto,
  IEventDetailDto,
  IPersonLookupDto,
  PersonLookupDto,
  RemoveEventAnswerCommand,
} from 'src/app/membermanager-api';

@Component({
  selector: 'app-event-attendees-dialog',
  templateUrl: './event-attendees-dialog.component.html',
  styleUrls: ['./event-attendees-dialog.component.scss'],
})
export class EventAttendeesDialogComponent implements OnInit {
  public attendees: EventAnswerDto[];
  displayedColumns: string[] = ['name', 'date', 'delete'];
  event: IEventDetailDto; //= { name: '', start: '', end: '',  organizer: new PersonLookupDto({firstName:'', surname: ''}) };

  formGroup: FormGroup;

  constructor(
    private eventClient: EventClient,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.eventClient.getSingle(data.id).subscribe((eventObject) => {
      this.attendees = eventObject.eventAnswers ?? [];
      this.event = eventObject;
      this.formGroup.setValue({ member: '', date: this.event.start });
    });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      member: this.fb.control('', [Validators.required]),
      date: this.fb.control(this.event?.start, [Validators.required]),
    });
  }

  attendeeRemove(id: number) {
    const cmd = new RemoveEventAnswerCommand({ id: id });
    this.eventClient.removeEventAnswer(cmd).subscribe(() => {
      this.eventClient.getSingle(this.data.id).subscribe((eventObject) => {
        this.attendees = eventObject.eventAnswers;
        this.event = eventObject;
      });
    });
  }

  attendeeAdd() {
    const person = this.formGroup.get('member').value;
    let id = undefined;
    if (typeof person === 'object') {
      id = (person as IPersonLookupDto).id;
    } else {
      console.warn('attendeeAdd: Could not extract personID');
      return;
    }
    const answerTime = new Date(this.event.start);
    const cmd = new AddEventAnswerCommand({
      eventId: this.event.id,
      personId: id,
      answerTime: answerTime.toISOString(),
    });
    this.eventClient.addEventAnswer(cmd).subscribe(() => {
      this.eventClient.getSingle(this.data.id).subscribe((eventObject) => {
        this.attendees = eventObject.eventAnswers;
        this.event = eventObject;
      });
    });
  }
}
