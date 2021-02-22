import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEditDialogComponent } from './position-edit-dialog.component';

describe('PositionEditDialogComponent', () => {
  let component: PositionEditDialogComponent;
  let fixture: ComponentFixture<PositionEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
