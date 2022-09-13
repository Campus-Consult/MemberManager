import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-history',
  templateUrl: './member-history.component.html',
  styleUrls: ['./member-history.component.scss'],
})
export class MemberHistoryComponent implements OnInit {
  @Input() title: string;
  @Input() historyData: HistoryData[];
  @Input() dismissCallback?: (historyData: HistoryData) => void;

  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.dismissCallback
      ? ['name', 'time-span', 'actions']
      : ['name', 'time-span'];
  }

  emitOpenDetails(element: HistoryData) {}

  dateSinceUntilToString(since: string, until: string | undefined) {
    if (!until) {
      return 'Seit ' + new Date(since).toLocaleDateString();
    } else {
      return (
        new Date(since).toLocaleDateString() +
        ' - ' +
        new Date(until).toLocaleDateString()
      );
    }
  }
}

export interface HistoryData {
  /** ID of the Element, for Details */
  id: number;
  // id of the element the user is connected to here (eg. Status, Position)
  connectedId: number;
  name: string;
  startDate: string;
  endDate?: string;
}
