import { Component, OnInit, Inject } from '@angular/core';
import { PositionApiService, Position, PositionEdit, PersonAssignment, PositionHolder } from '../../services/positionapi.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { AssignmentOption } from '../../components/search-select/search-select.component';
import { PositionClient, IPositionLookupDto, IAssignToPositionCommand, AssignToPositionCommand } from 'src/app/membermanager-api';
import { formatDate, getLocaleId } from '@angular/common';


@Component({
    selector: 'app-position-assign-dialog',
    templateUrl: 'position-assign-dialog.component.html',
  })
  export class PositionAssignDialogComponent implements OnInit {
  
    // track state
    public savingBeforeClose = false;
    public assignSuggestions: AssignmentOption[] = [];
  
    constructor(
      private formBuilder: FormBuilder,
      private positionClient: PositionClient,
      public dialogRef: MatDialogRef<PositionAssignDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public position: IPositionLookupDto) {
        this.savingBeforeClose = false;
    }
  
    ngOnInit(): void {
      this.positionClient
        .getAssignSuggestions(this.position.id)
        .subscribe(suggestions => {
          this.assignSuggestions = suggestions.suggestions.map(s => {
            return {name: s.name, id: s.id};
          });
        });
      console.log(this.assignSuggestions);
      // this.positionApiService.getAssignmentsSuggestion().subscribe(suggestions => {
      //   this.assignSuggestions = suggestions.map(s => {
      //     return {name: s.name, id: s.personID};
      //   });
      // });
      this.assignDate.setValue(new Date());
      this.assignForm.valueChanges.subscribe(v => {
        console.log(v);
      })
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    assignForm = this.formBuilder.group({
      assignPerson: [true, Validators.required],
      assignDate: [null, Validators.required],
    });
  
    get assignPerson() {
      return this.assignForm.get('assignPerson');
    }
  
    get assignDate(): AbstractControl {
      return this.assignForm.get('assignDate');
    }
  
    onSubmit(): void {
      if (this.savingBeforeClose) { return; }
      // triggers errors
      this.assignForm.markAllAsTouched();
      if (this.assignForm.invalid) { return; }
      console.log('saving...');
      this.savingBeforeClose = true;
      this.dialogRef.disableClose = true;
  
      this.positionClient.assign(this.position.id, new AssignToPositionCommand({
        assignmentDateTime: this.assignDate.value,
        positionId: this.position.id,
        personId: this.assignPerson.value.id,
      })).subscribe(val => {
        this.dialogRef.close();
      }, err => {
        // how do we want to handle errors? Notification top right?
        console.log(err);
        this.dialogRef.close();
      });
    }
  }
