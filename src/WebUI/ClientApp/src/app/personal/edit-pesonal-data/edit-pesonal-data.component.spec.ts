import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalDataComponent } from './edit-pesonal-data.component';

describe('EditPesonalDataComponent', () => {
  let component: EditPersonalDataComponent;
  let fixture: ComponentFixture<EditPersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
