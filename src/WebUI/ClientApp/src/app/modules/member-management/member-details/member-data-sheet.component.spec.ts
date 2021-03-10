import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDataSheetComponent } from './member-data-sheet.component';

describe('PersonDetailsComponent', () => {
  let component: MemberDataSheetComponent;
  let fixture: ComponentFixture<MemberDataSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDataSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
