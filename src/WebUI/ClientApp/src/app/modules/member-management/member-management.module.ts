import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { CreateMemberComponent } from './create-member/create-member.component';
import { ErrorHintComponent } from './create-member/error-hint/error-hint.component';
import { MemberFormComponent } from './create-member/member-form/member-form.component';
import { EditMemberDataComponent } from './edit-member-data/edit-member-data.component';
import { HistoryPanelsComponent } from './member-details/history-panels/history-panels.component';
import { MemberDataSheetComponent } from './member-details/member-data-sheet.component';
import { MemberDataComponent } from './member-details/member-data/member-data.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberManagementComponent } from './member-management.component';
import { MemberManagerRoutingModule } from './member-manager-routing.module';
import { HistoryDialogComponent } from './member-details/history-dialog/history-dialog.component';

@NgModule({
  declarations: [
    MemberManagementComponent,
    MemberDataSheetComponent,
    MemberListComponent,
    MemberDataComponent,
    EditMemberDataComponent,
    HistoryPanelsComponent,
    MemberFormComponent,
    CreateMemberComponent,
    ErrorHintComponent,
    HistoryDialogComponent,
  ],
  exports: [MemberManagementComponent],
  imports: [
    CommonModule,
    MemberManagerRoutingModule,
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
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    MatSortModule,
    MatButtonToggleModule,
    FlexLayoutModule,
  ],
  entryComponents: [CreateMemberComponent, EditMemberDataComponent],
})
export class MemberManagementModule {}
