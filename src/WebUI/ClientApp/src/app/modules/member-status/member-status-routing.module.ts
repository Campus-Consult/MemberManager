import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberStatusComponent } from './components/member-status/member-status.component';

const routes: Routes = [
  { path: 'member-status', component: MemberStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MemberStatusRoutingModule { }
