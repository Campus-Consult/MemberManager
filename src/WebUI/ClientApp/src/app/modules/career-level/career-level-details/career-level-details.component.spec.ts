import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLevelDetailsComponent } from './career-level-details.component';

describe('CareerLevelDetailsComponent', () => {
  let component: CareerLevelDetailsComponent;
  let fixture: ComponentFixture<CareerLevelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerLevelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLevelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
