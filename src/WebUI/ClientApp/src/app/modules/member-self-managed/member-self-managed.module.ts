import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberSelfManagedComponent } from './member-self-managed.component';


@NgModule({
  declarations: [
    MemberSelfManagedComponent,
  ],
  imports: [
    CommonModule, SharedModule, MatCardModule
  ],
  exports: [MemberSelfManagedComponent]
})
export class MemberSelfManagedModule { }
