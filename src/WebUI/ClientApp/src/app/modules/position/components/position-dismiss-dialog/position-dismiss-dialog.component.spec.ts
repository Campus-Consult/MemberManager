import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDismissDialogComponent } from './position-dismiss-dialog.component';

describe('PositionDismissDialogComponent', () => {
  let component: PositionDismissDialogComponent;
  let fixture: ComponentFixture<PositionDismissDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionDismissDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDismissDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
