import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelfManagedComponent } from './member-self-managed.component';

describe('MemberSelfManagedComponent', () => {
  let component: MemberSelfManagedComponent;
  let fixture: ComponentFixture<MemberSelfManagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberSelfManagedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSelfManagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
