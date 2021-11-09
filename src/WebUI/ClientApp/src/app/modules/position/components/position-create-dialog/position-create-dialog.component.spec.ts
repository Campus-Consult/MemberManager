import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCreateDialogComponent } from './position-create-dialog.component';

describe('PositionCreateDialogComponent', () => {
  let component: PositionCreateDialogComponent;
  let fixture: ComponentFixture<PositionCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionCreateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
