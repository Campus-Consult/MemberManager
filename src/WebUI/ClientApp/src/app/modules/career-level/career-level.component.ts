import { CareerLevelLookupDto } from './../../membermanager-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CareerLevelDetailsComponent } from './career-level-details/career-level-details.component';
import { CareerLevelListComponent } from './career-level-list/career-level-list.component';

@Component({
  selector: 'app-career-level',
  templateUrl: './career-level.component.html',
  styleUrls: ['./career-level.component.scss'],
})
export class CareerLevelComponent implements OnInit {
  @ViewChild(CareerLevelListComponent)
  careerLevelList: CareerLevelListComponent;
  @ViewChild(CareerLevelDetailsComponent)
  careerLevelDetails: CareerLevelDetailsComponent;

  selectedCareerLevel: CareerLevelLookupDto;

  ngOnInit() {}

  onListSelection(selectedCareerLevel: CareerLevelLookupDto) {
    this.selectedCareerLevel = selectedCareerLevel;
  }

  reloadRequired(): void {
    this.reload();
  }

  reload(): void {
    this.careerLevelList.reload();
    this.careerLevelDetails.reload();
  }
}
