import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendeesDialogComponent } from './event-attendees-dialog.component';

describe('EventAttendeesDialogComponent', () => {
  let component: EventAttendeesDialogComponent;
  let fixture: ComponentFixture<EventAttendeesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventAttendeesDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttendeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
