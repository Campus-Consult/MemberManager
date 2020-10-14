import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { MemberDataSheetComponent } from './person-details/member-data-sheet.component';
import { PersonListComponent } from './person-list/person-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { ComponentsModule } from '../components/components.module';
import { PersonalDataComponent } from './person-details/personal-data/personal-data.component';
import { EditPetsonalDataComponent } from './person-details/edit-pesonal-data/edit-pesonal-data.component';
import { HistoryExpansionComponent } from './person-details/history-panels/history-expansion/history-expansion.component';
import { HistoryPanelsComponent } from './person-details/history-panels/history-panels.component';
import { MemberFormComponent } from './person-details/member-form/member-form.component';

@NgModule({
  declarations: [
    PersonalComponent,
    MemberDataSheetComponent,
    PersonListComponent,
    PersonalDataComponent,
    EditPetsonalDataComponent,
    HistoryExpansionComponent,
    HistoryPanelsComponent,
    MemberFormComponent
  ],
  exports: [PersonalComponent],
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
    ReactiveFormsModule
  ],
})
export class PersonalModule {}
