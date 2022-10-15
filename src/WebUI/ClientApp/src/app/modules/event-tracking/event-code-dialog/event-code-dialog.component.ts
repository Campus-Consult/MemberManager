import { catchError } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileResponse, UpdateEventCommand } from 'src/app/membermanager-api';
import { EventFormDialogData } from '../event-form/event-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-code-dialog',
  templateUrl: './event-code-dialog.component.html',
  styleUrls: ['./event-code-dialog.component.scss'],
})
export class EventCodeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData
  ) {}

  ngOnInit(): void {
    this.data.submitAction = (result: UpdateEventCommand) =>
      this.data
        .submitAction(result)
        .pipe(
          catchError<FileResponse, Observable<FileResponse>>((error) =>
            this.handleUpdateError(error)
          )
        );
  }

  handleUpdateError(error: any): any {
    // Handle specific Update Errors in future
    return error;
  }

  onSubmit(event: UpdateEventCommand) {
    this.dialogRef.close(event);
  }
}
