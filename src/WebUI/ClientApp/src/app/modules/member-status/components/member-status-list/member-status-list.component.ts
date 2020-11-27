import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberStatusClient, MemberStatusLookupDto } from '../../../../membermanager-api';

@Component({
  selector: 'app-member-status-list',
  templateUrl: './member-status-list.component.html',
  styleUrls: [
    './member-status-list.component.scss']
})

export class MemberStatusListComponent implements AfterViewInit {

  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  memberStatus: MemberStatusLookupDto[];
  dataSource: MatTableDataSource<MemberStatusLookupDto>;
  columns: string[] = ['name', 'countAssignees'];

  constructor(private memberStatusClient: MemberStatusClient) { }

  ngAfterViewInit() {

    this.memberStatusClient.get().subscribe(
      result => {
        this.memberStatus = result.memberStatus;
        this.dataSource = new MatTableDataSource<MemberStatusLookupDto>(result.memberStatus);
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    );
  }

  onSelect(item: MemberStatusLookupDto) {
    console.log(item.name);
  }
}
