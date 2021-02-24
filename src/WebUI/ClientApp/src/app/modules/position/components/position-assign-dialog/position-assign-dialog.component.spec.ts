import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAssignDialogComponent } from './position-assign-dialog.component';

describe('PositionAssignDialogComponent', () => {
  let component: PositionAssignDialogComponent;
  let fixture: ComponentFixture<PositionAssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionAssignDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
