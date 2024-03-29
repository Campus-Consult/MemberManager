import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberManagementComponent } from './member-management.component';

describe('PersonalComponent', () => {
  let component: MemberManagementComponent;
  let fixture: ComponentFixture<MemberManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
