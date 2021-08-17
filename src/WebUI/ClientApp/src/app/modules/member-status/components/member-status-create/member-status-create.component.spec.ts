import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusCreateComponent } from './member-status-create.component';

describe('MemberStatusCreateComponent', () => {
  let component: MemberStatusCreateComponent;
  let fixture: ComponentFixture<MemberStatusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStatusCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
