import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusEditDialogComponent } from './member-status-edit-dialog.component';

describe('MemberStatusEditComponent', () => {
  let component: MemberStatusEditDialogComponent;
  let fixture: ComponentFixture<MemberStatusEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberStatusEditDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
