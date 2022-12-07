import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AttendEventCommand,
  EventClient,
  EventDetailDto,
  IAttendEventCommand,
} from 'src/app/membermanager-api';

@Component({
  selector: 'app-event-tracking-landingpage',
  templateUrl: './event-tracking-landingpage.component.html',
  styleUrls: ['./event-tracking-landingpage.component.scss'],
})
export class EventTrackingLandingpageComponent implements OnInit {
  eventId: number;
  eventCode: string;
  event: EventDetailDto;
  state: LandingPageState = LandingPageState.eventDefault;
  landingPageStateEnum = LandingPageState;

  constructor(
    private route: ActivatedRoute,
    private eventClient: EventClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.eventId = params['eventid'];
      this.eventCode = params['eventcode'];
      this.eventClient
        .getSingle(this.eventId)
        .subscribe((response: EventDetailDto) => {
          this.event = response;
        });
    });
  }

  isEventExpired(event: EventDetailDto): boolean {
    const currentDate = new Date();
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    return !(currentDate < endDate && currentDate > startDate);
  }

  confirmAttendance() {
    const command = new AttendEventCommand({
      eventId: this.event.id,
      eventSecretKey: this.event.secretKey,
    });
    this.eventClient.attend(command).subscribe((response) => {
      this.state = LandingPageState.eventConfirmed;
    });
  }
}

enum LandingPageState {
  eventExpired,
  eventConfirmed,
  eventDefault,
}
