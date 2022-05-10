import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTrackingTableComponent } from './event-tracking-table/event-tracking-table.component';



@NgModule({
  declarations: [
    EventTrackingTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [EventTrackingTableComponent]
})
export class EventTrackingModule { }
