import {
  PeopleClient,
  ICreateEventCommand,
} from './../../../membermanager-api';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonLookupDto } from 'src/app/membermanager-api';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';
import { Observable } from 'rxjs';
import { startWith, map, pluck, filter } from 'rxjs/operators';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {

  @Input()
  suggestedOrganizer: PersonLookupDto[] = [];

  tagsOnEvent: Set<string> = new Set(['MV', 'VT']);

  autoCompleteKeywords: string[] = ['Peter', 'Max', 'Kevin'];
  filteredOptions: Observable<string[]>;
  lastAutoValue = '';


  eventFormGroup = this.formBuilder.group({
    name: ['Event', [Validators.required]],
    tags: [[this.tagsOnEvent], [Validators.required]],
    tagInput: [''],
    organizer: ['', [Validators.required]],
    startDate: [Date.now()],
    endDate: [Date.now()],
    startTime: ['20:00'],
    endTime: ['22:00'],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberClient: PeopleClient
  ) {}

  ngOnInit(): void {
    const sub = this.memberClient.get().subscribe((data) => {
      this.suggestedOrganizer.concat(data.people);
      sub.unsubscribe();
    });

    this.filteredOptions = this.eventFormGroup.valueChanges.pipe(
      pluck('tagInput'),
      startWith(''),
      filter((value) => this.lastAutoValue !== value),
      map((value) => {
        this.lastAutoValue = value;
        return this._filter(value);
      })
    );
  }

  addTagFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.tagsOnEvent.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeTag(keyword: string) {
    this.tagsOnEvent.delete(keyword);
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.autoCompleteKeywords.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    const command: ICreateEventCommand = {
      name: this.eventFormGroup.get('name').value,
      tags: Array.from(this.eventFormGroup.get('tags').value),
    };
    // TODO: create output interface
    if (this.eventFormGroup.status) this.dialogRef.close(this.eventFormGroup);
  }
}
