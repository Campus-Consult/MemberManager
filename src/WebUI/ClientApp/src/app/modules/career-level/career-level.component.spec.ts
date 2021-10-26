import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLevelComponent } from './career-level.component';

describe('CareerLevelComponent', () => {
  let component: CareerLevelComponent;
  let fixture: ComponentFixture<CareerLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerLevelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
