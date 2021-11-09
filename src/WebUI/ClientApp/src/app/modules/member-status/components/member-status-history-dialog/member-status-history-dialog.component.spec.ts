import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberStatusAssignDialogComponent } from '../member-status-assign-dialog/member-status-assign-dialog.component';

describe('MemberStatusAssignDialogComponent', () => {
  let component: MemberStatusAssignDialogComponent;
  let fixture: ComponentFixture<MemberStatusAssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberStatusAssignDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
