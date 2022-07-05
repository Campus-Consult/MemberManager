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
import { PersonDetailVm, IPersonDetailVm } from 'src/app/membermanager-api';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';
import { Observable } from 'rxjs';
import { startWith, map, pluck } from 'rxjs/operators';
import { DisplayOrganizerPipe } from './display-organizer.pipe';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input()
  suggOrganizer: IPersonDetailVm[] = [];
  @Input()
  suggTags: string[] = ['Peter', 'Max', 'Kevin'];

  tagsOnEvent: Set<string> = new Set(['MV', 'VT']);

  // Auto Complete Observables, which handle valueChangeEvents
  filteredTagOptions: Observable<string[]>;
  filteredOrgaOptions: Observable<IPersonDetailVm[]>;

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
    protected displayOrganizerPipe: DisplayOrganizerPipe
  ) {}

  ngOnInit(): void {
    /*     const sub = this.memberClient.get().subscribe((data) => {
      this.suggestedOrganizer = this.suggestedOrganizer.concat(data.people);
      sub.unsubscribe();
    }); */

    this.suggOrganizer = [
      { firstName: 'Kevin', surname: 'Kvbe', emailAssociaton: 'aalf@cc.de' },
      { firstName: 'Adrian', surname: 'rec', emailAssociaton: 'arec@cc.de' },
      { firstName: 'chlor', surname: 'serbe', emailAssociaton: 'erbe@cc.de' },
    ];

    // Filter Observable for tags and organizer
    this.filteredTagOptions = this.eventFormGroup.valueChanges.pipe(
      pluck('tagInput'),
      startWith(''),
      map((value) => this._filterTags(value || ''))
    );
    this.filteredOrgaOptions = this.eventFormGroup.valueChanges.pipe(
      pluck('organizer'),
      startWith(''),
      map((value) => {
        const name =
          typeof value === 'string' ? value : this.displayOrganizerFn(value);
        return this._filterOrga(name);
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

  private _filterTags(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.suggTags.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterOrga(person: string): IPersonDetailVm[] {
    console.log(person);
    const filterValue = person.toLowerCase();
    const arr = this.suggOrganizer.filter((option) =>
      this.displayOrganizerFn(option).toLowerCase().includes(filterValue)
    );
    return arr;
  }

  displayOrganizerFn(person: IPersonDetailVm): string {
    return this.displayOrganizerPipe.transform(person);
  }

  onSubmit() {
    const organizer = this.eventFormGroup.get('organizer')
      .value as PersonDetailVm;
    const command: ICreateEventCommand = {
      name: this.eventFormGroup.get('name').value,
      tags: Array.from(this.eventFormGroup.get('tags').value),
      organizerEmail: organizer.emailAssociaton,
    };
    // TODO: create output interface
    if (this.eventFormGroup.status) this.dialogRef.close(this.eventFormGroup);
  }
}
