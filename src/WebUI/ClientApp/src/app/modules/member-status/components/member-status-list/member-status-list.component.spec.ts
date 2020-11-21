import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusListComponent } from './member-status-list.component';

describe('MemberStatusListComponent', () => {
  let component: MemberStatusListComponent;
  let fixture: ComponentFixture<MemberStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
