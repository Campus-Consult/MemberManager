import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionReactivateDialogComponent } from './position-reactivate-dialog.component';

describe('PositionReactivateDialogComponent', () => {
  let component: PositionReactivateDialogComponent;
  let fixture: ComponentFixture<PositionReactivateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionReactivateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionReactivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
