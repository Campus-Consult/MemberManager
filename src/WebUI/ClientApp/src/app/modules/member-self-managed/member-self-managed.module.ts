import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
    CommonModule, ReactiveFormsModule, SharedModule, MatCardModule, MatButtonModule, MatFormFieldModule
  ],
  exports: [MemberSelfManagedComponent]
})
export class MemberSelfManagedModule { }
