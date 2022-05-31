import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCodeDialogComponent } from './event-code-dialog.component';

describe('EventCodeDialogComponent', () => {
  let component: EventCodeDialogComponent;
  let fixture: ComponentFixture<EventCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
