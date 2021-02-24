import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { PositionComponent } from './components/position/position.component';

const routes: Routes = [
  { path: 'position', component: PositionComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PositionRoutingModule { }
