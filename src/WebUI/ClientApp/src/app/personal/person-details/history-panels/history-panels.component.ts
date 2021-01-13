import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { IPersonBasicInfoLookupDto } from "src/app/membermanager-api";
import { HistoryData } from "./history-expansion/history-expansion.component";

@Component({
  selector: "app-history-panels",
  templateUrl: "./history-panels.component.html",
  styleUrls: ["./history-panels.component.scss"],
})
export class HistoryPanelsComponent implements OnInit, OnChanges {
  @Input() person: IPersonBasicInfoLookupDto;

  // Expansionpanels Desc
  public currentMemberState: any;
  public currentCareerLevel: any;
  public currentPositions: any[];

  public memberStateHistory: HistoryData[];
  public careerLevelHistory: HistoryData[];
  public positionsHistory: HistoryData[];

  constructor() {}

  ngOnChanges(chng) {
    if ("personDetails" in chng && this.person) {
      this.currentMemberState = this.getCurrentMemberStatus();
      this.currentCareerLevel = this.getCurrentCareerLevel();
      this.currentPositions = this.getCurrentPositions();

      this.memberStateHistory = this.getMemberStatusHistory();
      this.careerLevelHistory = this.getCareerLevelHistory();
      this.positionsHistory = this.getPositionHistory();
    }
  }

  ngOnInit(): void {
    // TODO: transform into History data
    // TODO AAM: Propertys could undefinded and need get from Backend
  }

  getCareerLevelHistory(): HistoryData[] {
    const personId = this.person.id;
    console.warn("getCareerLevelHistory not implemented");

    return [];
  }

  getPositionHistory(): HistoryData[] {
    const personId = this.person.id;
    console.warn("getPositionHistory not implemented");
    return [];
  }

  getMemberStatusHistory(): HistoryData[] {
    const personId = this.person.id;
    console.warn("getMemberStatusHistory not implemented");
    return [];
  }

  getCurrentCareerLevel(): any {
    const personId = this.person;
    console.warn("getCurrentCareerLevel not implemented");
    return undefined;
  }

  getCurrentPositions(): any[] {
    const personId = this.person;
    console.warn("getCurrentPositions not implemented");
    return [];
  }

  getCurrentMemberStatus(): any {
    const personId = this.person;
    console.warn("getCurrentMemberStatus not implemented");
    return undefined;
  }
}
