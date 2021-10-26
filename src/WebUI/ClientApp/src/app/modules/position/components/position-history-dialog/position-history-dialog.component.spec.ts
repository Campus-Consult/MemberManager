import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionHistoryDialogComponent } from './position-history-dialog.component';

describe('PositionAssignDialogComponent', () => {
  let component: PositionHistoryDialogComponent;
  let fixture: ComponentFixture<PositionHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionHistoryDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
