import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLevelListComponent } from './career-level-list.component';

describe('CareerLevelListComponent', () => {
  let component: CareerLevelListComponent;
  let fixture: ComponentFixture<CareerLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerLevelListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
