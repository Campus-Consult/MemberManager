import { Component, ViewChild } from '@angular/core';

import { MemberStatusLookupDto } from '../../../../membermanager-api';
import { MemberStatusDetailsComponent } from '../member-status-details/member-status-details.component';
import { MemberStatusListComponent } from '../member-status-list/member-status-list.component';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  @ViewChild(MemberStatusListComponent) memberStatusList: MemberStatusListComponent;
  @ViewChild(MemberStatusDetailsComponent) memberStatusDetails: MemberStatusDetailsComponent;

  debug: boolean = false;

  selectedMemberStatus: MemberStatusLookupDto;

  ngOnInit() { }

  onListSelection(selectedMemberStatus: MemberStatusLookupDto) {
    this.selectedMemberStatus = selectedMemberStatus;
  }

  reloadRequired(): void {
    this.reload();
  }

  reload(): void {
    this.memberStatusList.reload();
    this.memberStatusDetails.reload();
  }
}
