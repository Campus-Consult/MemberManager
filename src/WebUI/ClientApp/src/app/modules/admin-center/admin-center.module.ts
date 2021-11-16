import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminCenterComponent } from './admin-center.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAdminDialogComponent } from './add-admin-dialog/add-admin-dialog.component';
import { MatTableModule } from '@angular/material/table';


const routes: Routes = [
  { path: '', component: AdminCenterComponent }
];

@NgModule({
  declarations: [AdminCenterComponent, AdminListComponent, AddAdminDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class AdminCenterModule { }
