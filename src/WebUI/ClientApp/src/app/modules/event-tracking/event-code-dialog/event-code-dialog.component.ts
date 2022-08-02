import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDetailDto } from 'src/app/membermanager-api';

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
    @Inject(MAT_DIALOG_DATA) public data: EventDetailDto
  ) {}

  ngOnInit(): void {
    // TODO: refactor to pipe
    const urlAppendix = this.data.id + this.data.secretKey;
    this.qrDataUrl = this.urlPath + urlAppendix;
  }
}
