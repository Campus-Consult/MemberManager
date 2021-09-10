import { AdminGuard, FORBIDDEN_ROUTE_STRING } from "./../../guards/admin.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { MemberManagementComponent } from "./member-management.component";
import { PageForbiddenComponent } from "src/app/shared/components/page-forbidden/page-forbidden.component";

const routes: Routes = [
  {
    path: "Personal",
    component: MemberManagementComponent,
    canActivate: [AuthorizeGuard, AdminGuard],
    pathMatch: "full",
  },
  { path: FORBIDDEN_ROUTE_STRING, component: PageForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MemberManagerRoutingModule {}
