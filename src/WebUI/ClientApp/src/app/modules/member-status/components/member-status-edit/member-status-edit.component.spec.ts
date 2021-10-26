import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusEditComponent } from './member-status-edit.component';

describe('MemberStatusEditComponent', () => {
  let component: MemberStatusEditComponent;
  let fixture: ComponentFixture<MemberStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberStatusEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
