import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  IPersonWithBasicInfoLookupDto,
  IPersonDetailVm,
} from '../../membermanager-api';
import { CreateMemberComponent } from './create-member/create-member.component';
import { EditMemberDataComponent } from './edit-member-data/edit-member-data.component';
import { MemberListComponent } from './member-list/member-list.component';

@Component({
  selector: 'app-personal',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.scss'],
})
export class MemberManagementComponent implements OnInit {
  @ViewChild(MemberListComponent) personListComp: MemberListComponent;

  // View
  public selectedPerson: IPersonWithBasicInfoLookupDto;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEdit(person: IPersonDetailVm) {
    const dialogRef = this.dialog.open(EditMemberDataComponent, {
      maxHeight: '800px',
      width: '600px',
      data: person,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onRefresh();
    });
  }

  onRefresh() {
    this.personListComp.onRefresh();
  }

  onDelete() {
    this.onChangeDisplayedPerson(undefined);
    this.onRefresh();
  }

  onChangeDisplayedPerson(selectedPerson: IPersonWithBasicInfoLookupDto) {
    this.selectedPerson = selectedPerson;
  }

  getDialogSizeConfig(): MatDialogConfig {
    let height: string;
    let width: string;

    if (window.screenY <= 600) {
      //mobile fullscreen
      //max-height:
    }
    return { maxHeight: height, maxWidth: width };
  }
}
