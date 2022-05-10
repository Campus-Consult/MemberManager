import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTrackingTableComponent } from './event-tracking-table.component';

describe('EventTrackingTableComponent', () => {
  let component: EventTrackingTableComponent;
  let fixture: ComponentFixture<EventTrackingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTrackingTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTrackingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
