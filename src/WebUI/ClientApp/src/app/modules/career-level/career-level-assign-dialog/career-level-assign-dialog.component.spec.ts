import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLevelAssignDialogComponent } from './career-level-assign-dialog.component';

describe('CareerLevelAssignDialogComponent', () => {
  let component: CareerLevelAssignDialogComponent;
  let fixture: ComponentFixture<CareerLevelAssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerLevelAssignDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLevelAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
