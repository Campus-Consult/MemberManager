import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLevelDeactivateDialogComponent } from './career-level-deactivate-dialog.component';

describe('CareerLevelDeactivateDialogComponent', () => {
  let component: CareerLevelDeactivateDialogComponent;
  let fixture: ComponentFixture<CareerLevelDeactivateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerLevelDeactivateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLevelDeactivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
