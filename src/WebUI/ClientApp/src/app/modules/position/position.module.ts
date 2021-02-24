import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

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

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PositionRoutingModule } from './position-routing.module';

import { PositionComponent } from './components/position/position.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { PositionDetailsComponent } from './components/position-details/position-details.component';
import { PositionAssignDialogComponent } from './components/position-assign-dialog/position-assign-dialog.component';
import { PositionDismissDialogComponent } from './components/position-dismiss-dialog/position-dismiss-dialog.component';
import { PositionHistoryDialogComponent } from './components/position-history-dialog/position-history-dialog.component';
import { PositionCreateDialogComponent } from './components/position-create-dialog/position-create-dialog.component';
import { PositionEditDialogComponent } from './components/position-edit-dialog/position-edit-dialog.component';
import { PositionDeactivateDialogComponent } from './components/position-deactivate-dialog/position-deactivate-dialog.component';
import { PositionReactivateDialogComponent } from './components/position-reactivate-dialog/position-reactivate-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    PositionRoutingModule,

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
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PositionComponent,
    PositionListComponent,
    PositionDetailsComponent,
    PositionAssignDialogComponent,
    PositionDismissDialogComponent,
    PositionHistoryDialogComponent,
    PositionCreateDialogComponent,
    PositionEditDialogComponent,
    PositionDeactivateDialogComponent,
    PositionReactivateDialogComponent,
  ],
  exports: [
    PositionComponent,
  ]
})
export class PositionModule { }
