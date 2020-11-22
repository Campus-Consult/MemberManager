import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberStatusClient, MemberStatusLookupDto } from '../../../../membermanager-api';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-member-status-list',
  templateUrl: './member-status-list.component.html',
  styleUrls: [
    './member-status-list.component.scss']
})

export class MemberStatusListComponent implements OnInit {

  memberStatus: MemberStatusLookupDto[];

  constructor(private memberStatusClient: MemberStatusClient) {
    
  }

  ngOnInit(): void {

    this.memberStatusClient.get().subscribe(
      result => {
        this.memberStatus = result.memberStatus;
      },
      error => console.error(error)
    );
  }
}
