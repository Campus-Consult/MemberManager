import { CareerLevelComponent } from './career-level.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';

const routes: Routes = [{path: 'career-level', component: CareerLevelComponent, canActivate: [AuthorizeGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerLevelRoutingModule { }
