import { AdminGuard } from './../../guards/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { FORBIDDEN_ROUTE_STRING } from 'src/app/guards/admin.guard';
import { PageForbiddenComponent } from 'src/app/shared/components/page-forbidden/page-forbidden.component';
import { MemberStatusComponent } from './components/member-status/member-status.component';

const routes: Routes = [
  { path: 'member-status', component: MemberStatusComponent, canActivate: [AuthorizeGuard, AdminGuard] },
  { path: FORBIDDEN_ROUTE_STRING, component: PageForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MemberStatusRoutingModule { }
