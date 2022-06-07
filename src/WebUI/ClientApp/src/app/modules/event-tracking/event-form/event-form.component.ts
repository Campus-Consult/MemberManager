import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDetailDto } from 'src/app/membermanager-api';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  keywords = new Set(['angular', 'how-to', 'tutorial']);

  form = this.formBuilder.group({
    name: ['Event', [Validators.required]],
    tags: [[this.keywords], [Validators.required]],
    startDate: [Date.now()],
    endDate: [Date.now()],
    startTime: ['20:00'],
    endTime: ['22:00'],
  });

  formControl = new FormControl(['angular']);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }

  onSubmit() {
    // TODO: create output interface
    if(this.form.status)
      this.dialogRef.close(this.form)
  }
}
