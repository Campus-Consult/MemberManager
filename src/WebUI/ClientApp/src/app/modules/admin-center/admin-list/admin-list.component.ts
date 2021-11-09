import { AddAdminDialogComponent } from './../add-admin-dialog/add-admin-dialog.component';
import { DeleteDialogComponent } from './../../../shared/components/delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminUserCommand, AdminClient, CareerLevelLookupDto, FileResponse, IAddAdminUserCommand, RemoveAdminUserCommand } from './../../../membermanager-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';

export interface AdminListItem {
  name: string;
}

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  @ViewChild(DataTableComponent)
  dataTable: DataTableComponent<AdminListItem>;

  dataSource: MatTableDataSource<AdminListItem>;
  columns: string[] = ['name'];


  constructor(protected adminClient: AdminClient, protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  onCreate(){
    const dialogRef = this.dialog.open(AddAdminDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      let obs$ = this.addAdmin(result);
      obs$.subscribe(()=> this.loadAdmins())
    });
  }

  onDelete(name: string){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {description: `Willst du ${name} als Admin entfernen`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeAdmin(result).subscribe(()=> this.loadAdmins());  
      }
    });
  }

  loadAdmins(){
    this.adminClient.getCurrentAdmins().subscribe((admins)=>{
      const adminItemLists = new Array<AdminListItem>(); 
      for (const item of admins) {
        adminItemLists.push({name:item});
      }
      this.dataSource = new MatTableDataSource<AdminListItem>(adminItemLists);
      this.dataSource.sort = this.sort;
    }, err=> console.error(err));
  }

  addAdmin(email: string): Observable<FileResponse>{
    const command: AddAdminUserCommand = new AddAdminUserCommand({email:email });
    return this.adminClient.addAdmin(command);
  }

  removeAdmin(email: string): Observable<FileResponse>{
    const command: RemoveAdminUserCommand = new RemoveAdminUserCommand({email:email });
    return this.adminClient.removeAdmin(command);
  }

}
