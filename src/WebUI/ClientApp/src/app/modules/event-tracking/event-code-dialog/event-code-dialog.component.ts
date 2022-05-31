import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-code-dialog',
  templateUrl: './event-code-dialog.component.html',
  styleUrls: ['./event-code-dialog.component.scss']
})
export class EventCodeDialogComponent implements OnInit {

  qrDataUrl: string;

  constructor(
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }

}
