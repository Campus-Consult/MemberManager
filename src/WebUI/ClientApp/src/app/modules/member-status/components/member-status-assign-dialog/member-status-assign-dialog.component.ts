import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberStatusLookupDto } from '../../../../membermanager-api';
import { SelectOption } from '../../../../shared/components/search-select/search-select.component';

@Component({
  selector: 'app-member-status-assign-dialog',
  templateUrl: './member-status-assign-dialog.component.html',
  styleUrls: ['./member-status-assign-dialog.component.scss']
})
export class MemberStatusAssignDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  suggestions: SelectOption[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberStatusAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string, memberStatus: MemberStatusLookupDto }) {

    this.description = data.description;
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });

    this.fetchSuggestions();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  fetchSuggestions() {
    this.suggestions = [{ id: 1, name: "Hello" }, { id: 2, name: "World" }];
  }

  assign() {

  }
}
