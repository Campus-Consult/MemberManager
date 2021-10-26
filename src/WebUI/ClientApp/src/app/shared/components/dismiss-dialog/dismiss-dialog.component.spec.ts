import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissDialogComponent } from './dismiss-dialog.component';

describe('DismissDialogComponent', () => {
  let component: DismissDialogComponent;
  let fixture: ComponentFixture<DismissDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DismissDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DismissDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
