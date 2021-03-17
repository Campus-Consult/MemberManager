import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberManagementComponent } from "./member-management.component";
import { MemberDataSheetComponent } from "./member-details/member-data-sheet.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { ComponentsModule } from "../../components/components.module";
import { MemberDataComponent } from "./member-details/member-data/member-data.component";
import { EditMemberDataComponent } from "./edit-member-data/edit-member-data.component";
import { HistoryPanelsComponent } from "./member-details/history-panels/history-panels.component";
import { MemberFormComponent } from "./create-member/member-form/member-form.component";
import { CreateMemberComponent } from "./create-member/create-member.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "../../shared/shared.module";
import { ErrorHintComponent } from "./create-member/error-hint/error-hint.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FlexLayoutModule } from "@angular/flex-layout";

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
  ],
  exports: [MemberManagementComponent],
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
