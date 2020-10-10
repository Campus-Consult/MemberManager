import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from "@angular/common/locales/de";

import { AuthUserService } from '../services/authuser.service';
import { PositionApiService } from '../services/positionapi.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchSelectComponent } from '../components/search-select/search-select.component';

import { PositionComponent } from "./position.component";
import { PositionAssignDialogComponent } from "./position-assign-dialog/position-assign-dialog.component";
import { PositionCreateDialogComponent } from "./position-create-dialog/position-create-dialog.component";
import { PositionDismissDialogComponent } from "./position-dismiss-dialog/position-dismiss-dialog.component";
import { PositionEditDialogComponent } from "./position-edit-dialog/position-edit-dialog.component";
import { MatNativeDateModule } from '@angular/material/core';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    PositionComponent,
    PositionEditDialogComponent,
    PositionAssignDialogComponent,
    PositionDismissDialogComponent,
    PositionCreateDialogComponent,
  ],
  exports: [PositionComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,

    // BEGIN MATERIAL
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
})
export class PositionModule {}