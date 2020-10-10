import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-history-expansion',
  templateUrl: './history-expansion.component.html',
  styleUrls: ['./history-expansion.component.scss'],
})
export class HistoryExpansionComponent implements OnInit, OnChanges {
  @Input() title: string = '-';

  @Input() historyData: HistoryData[] = new Array<HistoryData>();

  @Input() panelDescription?: string;

  @Output() openDetails: EventEmitter<MouseEvent> = new EventEmitter<
    MouseEvent
  >();

  displayedColumns: string[] = ['name', 'startDate'];

  dataSource = new Array<HistoryTableSource>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('historyData' in changes && this.historyData) {
      for (const historyItem of this.historyData) {
        this.dataSource.push(this.convertToDataSourceItem(historyItem));
      }
    }
  }

  ngOnInit(): void {}

  convertToDataSourceItem(historyData: HistoryData): HistoryTableSource {
    const endDate = historyData.endDate
      ? historyData.endDate.toDateString()
      : '-';
    return {
      id: historyData.id,
      name: historyData.name,
      startDate: historyData.startDate.toDateString(),
      endDate: endDate,
    };
  }

  emitOpenDetails(event: MouseEvent) {
    this.openDetails.emit(event);
  }
}

export interface HistoryTableSource {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}
export interface HistoryData {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}
