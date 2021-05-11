import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareerLevelDialogComponent } from './create-career-level-dialog.component';

describe('CreateCareerLevelDialogComponent', () => {
  let component: CreateCareerLevelDialogComponent;
  let fixture: ComponentFixture<CreateCareerLevelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCareerLevelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCareerLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
