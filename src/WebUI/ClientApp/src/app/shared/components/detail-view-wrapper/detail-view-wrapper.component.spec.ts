import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewWrapperComponent } from './detail-view-wrapper.component';

describe('DetailViewWrapperComponent', () => {
  let component: DetailViewWrapperComponent;
  let fixture: ComponentFixture<DetailViewWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailViewWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
