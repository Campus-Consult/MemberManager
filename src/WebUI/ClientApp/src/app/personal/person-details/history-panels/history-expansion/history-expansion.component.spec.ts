import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExpansionComponent } from './history-expansion.component';

describe('HistoryExpansionComponent', () => {
  let component: HistoryExpansionComponent;
  let fixture: ComponentFixture<HistoryExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
