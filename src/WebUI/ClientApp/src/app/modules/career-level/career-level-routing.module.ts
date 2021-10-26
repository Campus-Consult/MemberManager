import { AdminGuard, FORBIDDEN_ROUTE_STRING } from './../../guards/admin.guard';
import { PageForbiddenComponent } from './../../shared/components/page-forbidden/page-forbidden.component';
import { CareerLevelComponent } from './career-level.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';

const routes: Routes = [
  {
    path: 'career-level',
    component: CareerLevelComponent,
    canActivate: [AuthorizeGuard, AdminGuard],
  },
  { path: FORBIDDEN_ROUTE_STRING, component: PageForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerLevelRoutingModule {}
