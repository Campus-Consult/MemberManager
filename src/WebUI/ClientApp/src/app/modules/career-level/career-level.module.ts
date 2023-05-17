import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerLevelComponent } from './career-level.component';
import { CareerLevelRoutingModule } from './career-level-routing.module';
import { CareerLevelListComponent } from './career-level-list/career-level-list.component';
import { CareerLevelDetailsComponent } from './career-level-details/career-level-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { CareerLevelAssignDialogComponent } from './career-level-assign-dialog/career-level-assign-dialog.component';
import { CareerLevelDismissDialogComponent } from './career-level-dismiss-dialog/career-level-dismiss-dialog.component';
import { CreateCareerLevelDialogComponent } from './create-career-level-dialog/create-career-level-dialog.component';
import { CareerLevelDeactivateDialogComponent } from './career-level-deactivate-dialog/career-level-deactivate-dialog.component';

@NgModule({
  declarations: [
    CareerLevelComponent,
    CareerLevelListComponent,
    CareerLevelDetailsComponent,
    CareerLevelAssignDialogComponent,
    CareerLevelDismissDialogComponent,
    CreateCareerLevelDialogComponent,
    CareerLevelDeactivateDialogComponent,
  ],
  imports: [
    CommonModule,
    CareerLevelRoutingModule,
    FlexLayoutModule,
    SharedModule,

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
})
export class CareerLevelModule {}
