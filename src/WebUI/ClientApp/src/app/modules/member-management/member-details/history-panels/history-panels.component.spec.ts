import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPanelsComponent } from './history-panels.component';

describe('HistoryPanelsComponent', () => {
  let component: HistoryPanelsComponent;
  let fixture: ComponentFixture<HistoryPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
