import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

//Angular Material Components
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailViewWrapperComponent } from './components/detail-view-wrapper/detail-view-wrapper.component';
import { AssignDialogComponent } from './components/assign-dialog/assign-dialog.component';
import { DismissDialogComponent } from './components/dismiss-dialog/dismiss-dialog.component';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { HistoryDialogComponent } from './components/history-dialog/history-dialog.component';
@NgModule({
  declarations: [
    DataTableComponent,
    SearchSelectComponent,
    SkeletonLoaderComponent,
    DetailViewWrapperComponent,
    AssignDialogComponent,
    DismissDialogComponent,
    DialogErrorComponent,
    PageForbiddenComponent,
    DeleteDialogComponent,
    HistoryDialogComponent,
  ],
  exports: [
    DataTableComponent,
    SkeletonLoaderComponent,
    SearchSelectComponent,
    DetailViewWrapperComponent,
    AssignDialogComponent,
    DismissDialogComponent,
    DialogErrorComponent,
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    NgxSkeletonLoaderModule,

    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class SharedModule {}
