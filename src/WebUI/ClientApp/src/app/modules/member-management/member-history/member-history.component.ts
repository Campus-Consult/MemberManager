import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-history',
  templateUrl: './member-history.component.html',
  styleUrls: ['./member-history.component.scss'],
})
export class MemberHistoryComponent implements OnInit {
  @Input() title: string;
  @Input() historyData: HistoryData[];
  @Input() dismissLabel: string = 'Entfernen';
  @Input() reassignLabel: string = 'Neu zuweisen';
  @Input() newAssignLabel: string = 'Neu zuweisen';
  @Input() dismissCallback?: (historyData: HistoryData) => void | Promise<void>;
  @Input() reassignCallback?: (
    historyData: HistoryData
  ) => void | Promise<void>;
  @Input() newAssignCallback?: () => void | Promise<void>;

  displayedColumns: string[] = [];
  isLocked = false;

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.dismissCallback
      ? ['name', 'time-span', 'actions']
      : ['name', 'time-span'];
  }

  wrapDismissCallback(historyData: HistoryData) {
    if (this.dismissCallback) {
      this.isLocked = true;
      Promise.resolve(this.dismissCallback(historyData)).finally(() => {
        this.isLocked = false;
      });
    }
  }

  wrapReassignCallback() {
    if (this.reassignCallback) {
      const active = this.historyData.find((val) => !val.endDate);
      this.isLocked = true;
      Promise.resolve(this.reassignCallback(active)).finally(() => {
        this.isLocked = false;
      });
    }
  }

  wrapNewAssignCallback() {
    if (this.newAssignCallback) {
      this.isLocked = true;
      Promise.resolve(this.newAssignCallback()).finally(() => {
        this.isLocked = false;
      });
    }
  }

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
