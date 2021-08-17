import { CreateMemberStatusCommand } from './../../../../membermanager-api';
import { MemberStatusCreateComponent } from './../member-status-create/member-status-create.component';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberStatusClient, MemberStatusLookupDto } from '../../../../membermanager-api';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

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

  @ViewChild(DataTableComponent) dataTable: DataTableComponent<MemberStatusLookupDto>;

  @Output() onSelectEvent = new EventEmitter<MemberStatusLookupDto>();


  memberStatus: MemberStatusLookupDto[];
  dataSource: MatTableDataSource<MemberStatusLookupDto>;
  columns: string[] = ['name', 'countAssignees'];

  selected: MemberStatusLookupDto;

  constructor(private memberStatusClient: MemberStatusClient, public dialog: MatDialog) { }

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
    this.selected = item;
    this.onSelectEvent.emit(item);
  }

  reload() {
    this.memberStatusClient.get().subscribe(
      result => {
        this.memberStatus = result.memberStatus;
        this.dataSource = new MatTableDataSource<MemberStatusLookupDto>(result.memberStatus);
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    );
  }

  openCreateDialog(): void  {
    const dialogRef = this.dialog.open(MemberStatusCreateComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload()
      }
    });
  }
}
