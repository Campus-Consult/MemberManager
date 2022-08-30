import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTrackingLandingpageComponent } from './event-tracking-landingpage.component';

describe('EventTrackingLandingpageComponent', () => {
  let component: EventTrackingLandingpageComponent;
  let fixture: ComponentFixture<EventTrackingLandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTrackingLandingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTrackingLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
