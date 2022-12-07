import { AdminGuard, FORBIDDEN_ROUTE_STRING } from './../../guards/admin.guard';
import { PageForbiddenComponent } from './../../shared/components/page-forbidden/page-forbidden.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { EventTrackingLandingpageComponent } from './event-tracking-landingpage/event-tracking-landingpage.component';

const routes: Routes = [
  {
    path: 'landingpage',
    component: EventTrackingLandingpageComponent,
    canActivate: [AuthorizeGuard],
  },
  { path: FORBIDDEN_ROUTE_STRING, component: PageForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventTrackingRoutingModule {}
