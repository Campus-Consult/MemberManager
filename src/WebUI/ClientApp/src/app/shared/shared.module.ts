import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DataTableComponent,
    SearchSelectComponent,
  ],
  exports: [
    DataTableComponent,
    SearchSelectComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,

    NgxSkeletonLoaderModule,
    MatAutocompleteModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
