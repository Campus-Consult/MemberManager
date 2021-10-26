import { Component, Input, OnChanges, OnInit } from "@angular/core";
import {
  IPersonDetailVm,
  PersonCareerLevelVm,
  PersonMemberStatusVm,
  PersonPositionVm,
} from "src/app/membermanager-api";

@Component({
  selector: "app-history-panels",
  templateUrl: "./history-panels.component.html",
  styleUrls: ["./history-panels.component.scss"],
})
export class HistoryPanelsComponent implements OnInit, OnChanges {
  @Input() person: IPersonDetailVm;

  /** key = title of expansionPanel, item = historyData */
  historyPanels = new Map<string, HistoryData[]>();

  displayedColumns: string[] = ["name", "time-span"];

  constructor() {}

  ngOnChanges(chng) {
    if ("person" in chng && this.person) {
      this.initHistoryData();
    }
  }

  ngOnInit(): void {
    if (this.person) {
      this.initHistoryData();
    }
  }

  emitOpenDetails(event: MouseEvent) {}

  dateSinceUntilToString(since: string, until: string | undefined) {
    if (!until) {
      return "Seit " + new Date(since).toLocaleDateString();
    } else {
      return new Date(since).toLocaleDateString() + " - " + new Date(until).toLocaleDateString();
    }
  }

  initHistoryData() {
    const memberStateHistory = this.getMemberStatusHistory(
      this.person.memberStatus
    );
    this.historyPanels.set("Mitglieds-Status", memberStateHistory);
    const careerLevelHistory = this.getCareerLevelHistory(
      this.person.careerLevels
    );
    this.historyPanels.set("Karriere-Level", careerLevelHistory);
    const positionsHistory = this.getPositionHistory(this.person.positions);
    this.historyPanels.set("Posten", positionsHistory);
  }

  getCareerLevelHistory(careerLevels: PersonCareerLevelVm[]): HistoryData[] {
    const historyArr = new Array<HistoryData>();
    for (const carerLevel of careerLevels) {
      historyArr.push({
        id: carerLevel.id,
        name: carerLevel.careerLevelName + ' (' + carerLevel.careerLevelShortName + ')',
        startDate: carerLevel.beginDateTime,
        endDate: carerLevel.endDateTime,
      });
    }
    return historyArr;
  }

  getPositionHistory(positions: PersonPositionVm[]): HistoryData[] {
    const historyArr = new Array<HistoryData>();
    for (const position of positions) {
      historyArr.push({
        id: position.id,
        name: position.positionName + ' (' + position.positionShortName  + ')',
        startDate: position.beginDateTime,
        endDate: position.endDateTime,
      });
    }
    return historyArr;
  }

  getMemberStatusHistory(memberStates: PersonMemberStatusVm[]): HistoryData[] {
    const historyArr = new Array<HistoryData>();
    for (const memberState of memberStates) {
      historyArr.push({
        id: memberState.id,
        name: memberState.memberStatusName,
        startDate: memberState.beginDateTime,
        endDate: memberState.endDateTime,
      });
    }
    return historyArr;
  }
}

export interface HistoryData {
  /** ID of the Element, for Details */
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}
