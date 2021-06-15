import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusCreateDialogComponent } from './member-status-create-dialog.component';

describe('MemberStatusCreateDialogComponent', () => {
  let component: MemberStatusCreateDialogComponent;
  let fixture: ComponentFixture<MemberStatusCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStatusCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
