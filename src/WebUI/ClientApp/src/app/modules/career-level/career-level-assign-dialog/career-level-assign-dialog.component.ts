import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CareerLevelClient,
  CareerLevelDto,
  ChangePersonCareerLevelCommand,
} from 'src/app/membermanager-api';
import { SelectOption } from 'src/app/shared/components/search-select/search-select.component';
import { CareerLevelLookupDto } from './../../../membermanager-api';

@Component({
  selector: 'app-career-level-assign-dialog',
  templateUrl: './career-level-assign-dialog.component.html',
  styleUrls: ['./career-level-assign-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerLevelAssignDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  suggestions: SelectOption[];

  careerLevel: CareerLevelLookupDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CareerLevelAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; careerLevel: CareerLevelDto },
    private careerlevelClient: CareerLevelClient
  ) {
    this.description = data.description;
    this.careerLevel = data.careerLevel;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
    });

    this.fetchSuggestions();
  }

  assignForm = this.fb.group({
    assignPerson: [true, Validators.required],
    assignDate: [null, Validators.required],
  });

  get assignPerson() {
    return this.assignForm.get('assignPerson').value;
  }

  get assignDate() {
    return this.assignForm.get('assignDate').value;
  }

  save() {
    this.careerlevelClient
      .changePersonCareerLevel(
        new ChangePersonCareerLevelCommand({
          changeDateTime: this.assignDate,
          careerLevelId: this.careerLevel.id,
          personId: this.assignPerson.id,
        })
      )
      .subscribe(
        (val) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.errors = error;
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

  fetchSuggestions() {
    this.careerlevelClient.getAssignSuggestions(this.careerLevel.id).subscribe(
      (suggestions) => {
        this.suggestions = suggestions.suggestions.map((s) => {
          return { name: s.name, id: s.id };
        });
      },
      (error) => console.error(error)
    );
  }
}
