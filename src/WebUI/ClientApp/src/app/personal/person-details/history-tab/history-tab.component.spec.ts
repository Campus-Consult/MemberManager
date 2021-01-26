import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTabComponent } from './history-tab.component';

describe('HistoryTabComponent', () => {
  let component: HistoryTabComponent;
  let fixture: ComponentFixture<HistoryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
