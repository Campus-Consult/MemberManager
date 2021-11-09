import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLevelDismissDialogComponent } from './career-level-dismiss-dialog.component';

describe('CareerLevelDismissDialogComponent', () => {
  let component: CareerLevelDismissDialogComponent;
  let fixture: ComponentFixture<CareerLevelDismissDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerLevelDismissDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLevelDismissDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
