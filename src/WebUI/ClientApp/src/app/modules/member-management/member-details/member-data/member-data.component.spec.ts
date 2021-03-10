import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDataComponent } from './member-data.component';

describe('PersonalDataComponent', () => {
  let component: MemberDataComponent;
  let fixture: ComponentFixture<MemberDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
