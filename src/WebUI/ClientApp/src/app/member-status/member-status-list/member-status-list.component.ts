import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberStatusClient, MemberStatusLookupDto } from '../../membermanager-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSpinner } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-member-status-list',
  templateUrl: './member-status-list.component.html',
  styleUrls: [
    './member-status-list.component.scss']
})

export class MemberStatusListComponent implements OnInit {
  @Input()
  displayedColumns?: string[];

  dataSource: MatTableDataSource<MemberStatusLookupDto>;
  selection: SelectionModel<MemberStatusLookupDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private memberStatusClient: MemberStatusClient) {
    this.dataSource = new MatTableDataSource();

    const initialSelection = [];
    const allowMultiSelect = false;

    this.selection = new SelectionModel<MemberStatusLookupDto>(allowMultiSelect, initialSelection);

    // selection changed
    this.selection.changed.subscribe((a) => {
      // TODO
    });
  }

  ngOnInit(): void {
    if (!this.displayedColumns) {
      this.displayedColumns = [
        'name',
        'countAssignees',
      ];
    }

    this.memberStatusClient.get().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<MemberStatusLookupDto>(result.memberStatus);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    );
  }
}
