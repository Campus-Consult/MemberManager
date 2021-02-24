import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DismissFromPositionCommand, PositionClient, PositionLookupDto } from '../../../../membermanager-api';
import { SelectOption } from '../../../../shared/components/search-select/search-select.component';

@Component({
  selector: 'app-position-dismiss-dialog',
  templateUrl: './position-dismiss-dialog.component.html',
  styleUrls: ['./position-dismiss-dialog.component.scss']
})
export class PositionDismissDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  suggestions: SelectOption[];

  position: PositionLookupDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { description: string, position: PositionLookupDto },
    private positionClient: PositionClient
  ) {

    this.description = data.description;
    this.position = data.position;
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });

    this.fetchSuggestions();
  }

  dismissForm = this.fb.group({
    dismissedPerson: [true, Validators.required],
    dismissalDate: [null, Validators.required],
  });

  get dismissedPerson() {
    return this.dismissForm.get('dismissedPerson').value;
  }

  get dismissalDate() {
    return this.dismissForm.get('dismissalDate').value;
  }

  save() {
    this.positionClient.dismiss(this.position.id, new DismissFromPositionCommand({
      dismissalDateTime: this.dismissalDate,
      positionId: this.position.id,
      personId: this.dismissedPerson.id,
    })).subscribe(val => {
      this.dialogRef.close(true);
    }, error => {
        let errors = JSON.parse(error.response);

        // TODO make error component
        if (errors) {
          console.error(errors);
          this.errors = errors.title + ":"

          for (var i = 0; i < errors.errors.PersonId.length; i++) {
            this.errors += errors.errors.PersonId[i];
          }
        }
        else {
          console.error(error);
        }

    });
  }

  close() {
    this.dialogRef.close();
  }

  fetchSuggestions() {
    this.positionClient.getDismissSuggestions(this.position.id).subscribe(
      suggestions => {
        this.suggestions = suggestions.suggestions.map(s => {
          return { name: s.name, id: s.id };
        });
      },
      error => console.error(error)
    );
  }
}
