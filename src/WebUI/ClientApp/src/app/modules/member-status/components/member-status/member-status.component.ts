import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { MemberStatusLookupDto } from '../../../../membermanager-api';
import { MemberStatusAssignDialogComponent } from '../member-status-assign-dialog/member-status-assign-dialog.component';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  debug: boolean = false;

  selectedMemberStatus: MemberStatusLookupDto;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  onListSelection(selectedMemberStatus: MemberStatusLookupDto) {
    this.selectedMemberStatus = selectedMemberStatus;
  }

  onAssignPersonButtonClicked() {

    this.dialog.open(MemberStatusAssignDialogComponent, {
      data: { description: "Assign to " + this.selectedMemberStatus.name, memberStatus: this.selectedMemberStatus }
    });
  }
}
