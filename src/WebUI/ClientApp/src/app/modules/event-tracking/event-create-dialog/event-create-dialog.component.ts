import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';
import { EventFormDialogData } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-create-dialog',
  templateUrl: './event-create-dialog.component.html',
  styleUrls: ['./event-create-dialog.component.scss'],
})
export class EventCreateDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData
  ) {}

  ngOnInit(): void {}

  onSubmit(event: EventFormDialogData) {
    this.dialogRef.close(event);
  }
}
