import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { MemberStatusLookupDto, MemberStatusVm, MemberStatusClient } from '../../membermanager-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-member-status-list',
  templateUrl: './member-status-list.component.html',
  styleUrls: ['./member-status-list.component.scss']
})

export class MemberStatusListComponent implements OnInit, OnChanges {
  @Input()
  memberStatusVm: MemberStatusVm;

  @Input()
  displayedColumns?: string[];

  dataSource: MatTableDataSource<MemberStatusLookupDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.displayedColumns) {
      this.displayedColumns = [
        'name',
      ];
    }
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.memberStatusVm?.memberStatus);
  }
}
