import { Component, OnInit, Inject } from '@angular/core';
import { PositionApiService, Position, PositionHolder } from '../../services/positionapi.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-position-dismiss-dialog',
  templateUrl: 'position-dismiss-dialog.component.html',
})
export class PositionDismissDialogComponent implements OnInit{
  // track state
  public savingBeforeClose = false;

  constructor(
    private formBuilder: FormBuilder,
    private positionApiService: PositionApiService,
    public dialogRef: MatDialogRef<PositionDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {position: Position, person: PositionHolder}) {
      this.savingBeforeClose = false;
  }

  ngOnInit(): void {
    this.date.setValue(new Date());
    this.date.valueChanges.subscribe(v => {
      console.log(v);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dismissForm = this.formBuilder.group({
    date: [null, Validators.required],
  });

  get date() {
    return this.dismissForm.get('date');
  }

  onSubmit(): void {
    if (this.savingBeforeClose) { return; }
    // triggers errors
    this.dismissForm.markAllAsTouched();
    if (this.dismissForm.invalid) { return; }
    console.log('saving...');
    this.savingBeforeClose = true;
    this.dialogRef.disableClose = true;

    const personsToDismiss: number[] = [this.data.person.personID];
    this.positionApiService.dismiss(this.data.position.positionID, formatDate(this.date.value, "yyyy-MM-dd", "en-US"), personsToDismiss).subscribe(val => {
      this.dialogRef.close();
    }, err => {
      // how do we want to handle errors? Notification top right?
      console.log(err);
      this.dialogRef.close();
    });
  }
}