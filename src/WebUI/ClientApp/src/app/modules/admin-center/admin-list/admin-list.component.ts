import { AddAdminDialogComponent } from './../add-admin-dialog/add-admin-dialog.component';
import { DeleteDialogComponent } from './../../../shared/components/delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  AddAdminUserCommand,
  AdminClient,
  CareerLevelLookupDto,
  FileResponse,
  IAddAdminUserCommand,
  RemoveAdminUserCommand,
} from './../../../membermanager-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';

export interface AdminListItem {
  email: string;
  test: string;
}

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  amdinListItems: AdminListItem[];

  @ViewChild(DataTableComponent)
  dataTable: DataTableComponent<AdminListItem>;

  dataSource: MatTableDataSource<AdminListItem>;
  columnList: string[] = ['email', 'delete'];

  constructor(
    protected adminClient: AdminClient,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  onCreate() {
    const dialogRef = this.dialog.open(AddAdminDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAdmins();
    });
  }

  onDelete(name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {title: 'Admin entfernen', content: `Willst du ${name} als Admin entfernen` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeAdmin(result).subscribe(() => this.loadAdmins());
      }
    });
  }

  loadAdmins() {
    console.log('loadAdmins');
    this.adminClient.getCurrentAdmins().subscribe(
      (admins) => {
        this.amdinListItems = new Array<AdminListItem>();
        for (const item of admins) {
          // test because, 
          this.amdinListItems.push({ email: item, test: 'test' });
        }
        console.log('getCurrentAdmins:', admins);

        this.dataSource = new MatTableDataSource<AdminListItem>(this.amdinListItems);
        this.dataSource.sort = this.sort;
      },
      (err) => console.error(err)
    );
  }

  removeAdmin(email: string): Observable<FileResponse> {
    const command: RemoveAdminUserCommand = new RemoveAdminUserCommand({
      email: email,
    });
    return this.adminClient.removeAdmin(command);
  }
}
