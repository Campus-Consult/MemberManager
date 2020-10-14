import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetsonalDataComponent } from './edit-pesonal-data.component';

describe('EditPesonalDataComponent', () => {
  let component: EditPetsonalDataComponent;
  let fixture: ComponentFixture<EditPetsonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPetsonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPetsonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
