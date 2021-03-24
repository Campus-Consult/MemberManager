import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { MemberManagementComponent } from './member-management.component';

const routes: Routes = [
  { path: 'Personal', component: MemberManagementComponent, canActivate: [AuthorizeGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MemberManagerRoutingModule { }
