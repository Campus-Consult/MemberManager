import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MemberStatusLookupDto } from '../../../../membermanager-api';
import { MemberStatusAssignDialogComponent } from '../member-status-assign-dialog/member-status-assign-dialog.component';
import { MemberStatusListComponent } from '../member-status-list/member-status-list.component';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  @ViewChild(MemberStatusListComponent) memberStatusList: MemberStatusListComponent;

  debug: boolean = false;

  selectedMemberStatus: MemberStatusLookupDto;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  onListSelection(selectedMemberStatus: MemberStatusLookupDto) {
    this.selectedMemberStatus = selectedMemberStatus;
  }

  onAssignPersonButtonClicked() {

    let dialogRef = this.dialog.open(MemberStatusAssignDialogComponent, {
      data: { description: "Assign to " + this.selectedMemberStatus.name, memberStatus: this.selectedMemberStatus }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.memberStatusList.reload();
        }
      })
  }
}
