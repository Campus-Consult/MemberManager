import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminCenterComponent } from './admin-center.component';


const routes: Routes = [
  { path: '', component: AdminCenterComponent }
];

@NgModule({
  declarations: [AdminCenterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminCenterModule { }
