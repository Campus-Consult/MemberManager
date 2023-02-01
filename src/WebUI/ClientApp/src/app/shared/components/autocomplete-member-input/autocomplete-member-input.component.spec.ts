import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMemberInputComponent } from './autocomplete-member-input.component';

describe('AutocompleteMemberInputComponent', () => {
  let component: AutocompleteMemberInputComponent;
  let fixture: ComponentFixture<AutocompleteMemberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteMemberInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteMemberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
