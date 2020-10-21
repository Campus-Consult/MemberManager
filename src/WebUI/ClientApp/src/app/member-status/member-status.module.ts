import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from '../components/components.module';
import { MemberStatusComponent } from './member-status.component';
import { MemberStatusListComponent } from './member-status-list/member-status-list.component';

@NgModule({
  declarations: [
    MemberStatusComponent, MemberStatusListComponent
  ],
  exports: [
    MemberStatusComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ]
})
export class MemberStatusModule { }
