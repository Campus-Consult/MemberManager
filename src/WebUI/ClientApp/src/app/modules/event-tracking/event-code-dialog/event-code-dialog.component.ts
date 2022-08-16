import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDetailDto } from 'src/app/membermanager-api';
import { EventFormDialogData } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-code-dialog',
  templateUrl: './event-code-dialog.component.html',
  styleUrls: ['./event-code-dialog.component.scss'],
})
export class EventCodeDialogComponent implements OnInit {
  urlPath = 'http://membermanager.campus-consult.org/event/attend';
  qrDataUrl = 'http://membermanager.campus-consult.org/';

  constructor(
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData
  ) {}

  ngOnInit(): void {
    // TODO: refactor to pipe
    const urlAppendix = this.data.edit.id + this.data.edit.secretKey;
    this.qrDataUrl = this.urlPath + urlAppendix;
  }

  onSubmit(event) {
    this.dialogRef.close(event);
  }
}
