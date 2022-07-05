import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTrackingTableComponent } from './event-tracking-table/event-tracking-table.component';
import { EventCodeDialogComponent } from './event-code-dialog/event-code-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { EventFormComponent } from './event-form/event-form.component';
@NgModule({
  declarations: [EventTrackingTableComponent, EventCodeDialogComponent, EventFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, QRCodeModule],
  exports: [EventTrackingTableComponent]
})
export class EventTrackingModule {}
