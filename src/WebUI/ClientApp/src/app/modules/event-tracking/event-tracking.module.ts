import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTrackingTableComponent } from './event-tracking-table/event-tracking-table.component';
import { EventCodeDialogComponent } from './event-code-dialog/event-code-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [EventTrackingTableComponent, EventCodeDialogComponent],
  imports: [CommonModule, SharedModule, QRCodeModule],
  exports: [EventTrackingTableComponent],
})
export class EventTrackingModule {}
