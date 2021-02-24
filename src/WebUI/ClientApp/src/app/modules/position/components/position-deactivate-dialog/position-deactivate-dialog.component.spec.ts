import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDeactivateDialogComponent } from './position-deactivate-dialog.component';

describe('PositionDeactivateDialogComponent', () => {
  let component: PositionDeactivateDialogComponent;
  let fixture: ComponentFixture<PositionDeactivateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionDeactivateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDeactivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
