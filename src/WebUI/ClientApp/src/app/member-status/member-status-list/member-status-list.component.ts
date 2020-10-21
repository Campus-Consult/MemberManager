import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberStatusLookupDto } from '../../membermanager-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSpinner } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-member-status-list',
  templateUrl: './member-status-list.component.html',
  styleUrls: ['./member-status-list.component.scss']
})

export class MemberStatusListComponent implements OnInit {
  private _memberStatusLookupDtos: MemberStatusLookupDto[];

  @Input()
  set memberStatusLookupDtos(value: MemberStatusLookupDto[]) {
    this._memberStatusLookupDtos = value;
    this.dataSource = new MatTableDataSource<MemberStatusLookupDto>(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get memberStatusLookupDtos(): MemberStatusLookupDto[] {
    return this._memberStatusLookupDtos;
  }

  @Input()
  displayedColumns?: string[];

  dataSource: MatTableDataSource<MemberStatusLookupDto>;
  selection: SelectionModel<MemberStatusLookupDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
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
  }
}
