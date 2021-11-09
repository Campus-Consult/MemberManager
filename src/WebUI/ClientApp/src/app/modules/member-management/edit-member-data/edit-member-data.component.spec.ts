import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberDataComponent } from './edit-member-data.component';

describe('EditPesonalDataComponent', () => {
  let component: EditMemberDataComponent;
  let fixture: ComponentFixture<EditMemberDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditMemberDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
