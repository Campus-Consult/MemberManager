import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusDetailsComponent } from './member-status-details.component';

fdescribe('MemberStatusDetailsComponent', () => {
  let component: MemberStatusDetailsComponent;
  let fixture: ComponentFixture<MemberStatusDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStatusDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
