import { Component, ViewChild } from '@angular/core';

import { PositionLookupDto } from '../../../../membermanager-api';
import { PositionDetailsComponent } from '../position-details/position-details.component';
import { PositionListComponent } from '../position-list/position-list.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  @ViewChild(PositionListComponent) positionList: PositionListComponent;
  @ViewChild(PositionDetailsComponent)
  positionDetails: PositionDetailsComponent;

  debug: boolean = false;

  selectedPosition: PositionLookupDto;

  ngOnInit() {}

  onListSelection(selectedPosition: PositionLookupDto) {
    this.selectedPosition = selectedPosition;
  }

  reloadRequired(): void {
    this.reload();
  }

  reload(): void {
    this.positionList.reload();
    this.positionDetails.reload();
  }
}
