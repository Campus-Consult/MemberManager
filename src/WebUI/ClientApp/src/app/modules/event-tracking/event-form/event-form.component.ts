import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import {
  EventDetailDto,
  IPersonDetailVm,
  IUpdateEventCommand,
  PersonDetailVm,
} from 'src/app/membermanager-api';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';
import {
  ICreateEventCommand,
  PeopleClient,
} from './../../../membermanager-api';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  suggOrganizer: IPersonDetailVm[] = [];

  suggTags: string[];
  startingTags: Set<string>;
  tagsOnEvent: Set<string>;

  formError = { organizer: '' };

  // Auto Complete Observables, which handle valueChangeEvents
  filteredTagOptions: Observable<string[]>;
  filteredOrgaOptions: Observable<IPersonDetailVm[]>;

  eventFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData,
    private memberClient: PeopleClient
  ) {
    this.suggTags = this.data.suggestedTags;
    this.startingTags = new Set(this.data.startingTags);
    this.tagsOnEvent = new Set(this.data.startingTags);
  }

  ngOnInit(): void {
    // Init Suggested Organizer, default load People
    if (this.data.suggestedOrganizer?.length > 0) {
      this.suggOrganizer = this.data.suggestedOrganizer;
    } else {
      this.memberClient.getWithBasicInfo().subscribe((data) => {
        this.suggOrganizer = this.suggOrganizer.concat(data.people);
      });
    }

    const eventEdit = this.data.edit;
    this.eventFormGroup = this.formBuilder.group({
      name: [eventEdit?.name ?? 'Vereinstreffen', [Validators.required]],
      tags: [
        [this.tagsOnEvent],
        {
          validators: [Validators.required, (val) => this.isInternal(val)],
          updateOn: 'blur',
        },
      ],
      tagInput: [''],
      organizer: [eventEdit?.organizer ?? '', [Validators.required]],
      eventDate: [Date.now(), [Validators.required]],
      startTime: ['20:00', [Validators.required]],
      endTime: ['22:00', [Validators.required]],
    });
    if (eventEdit) {
      const startDate = new Date(eventEdit.start);
      const endDate = new Date(eventEdit.end);
      const start = `${startDate.getHours()}:${startDate.getMinutes()}`;
      const end = `${endDate.getHours()}:${endDate.getMinutes()}`;
      this.eventFormGroup.setValue({
        eventDate: startDate,
        start: start,
        end: end,
      });
    }

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
    const filterValue = person.toLowerCase();
    return this.suggOrganizer.filter((option) =>
      this.displayOrganizerFn(option).toLowerCase().includes(filterValue)
    );
  }

  displayOrganizerFn(person: IPersonDetailVm): string {
    return person ? `${person.firstName} ${person.surname}` : '';
  }

  onSubmit() {
    if (this.eventFormGroup.status) {
      const command = this.getCommand();
      this.dialogRef.close(command);
    }
  }

  isInternal(formControl: AbstractControl): ValidationErrors | null {
    console.log('werde ausgeführt');

    const isInternalOrganizer =
      this.suggOrganizer.findIndex(
        (value) => formControl.value.id === value.id
      ) > -1;
    this.formError.organizer = isInternalOrganizer
      ? ''
      : 'Person existiert nicht im Member Manager oder ist Teil von CC';
    return isInternalOrganizer
      ? { forbiddenName: { value: formControl.value } }
      : null;
  }

  getCommand() {
    let organizer = this.eventFormGroup.get('organizer').value;
    if (!organizer) {
      organizer = undefined;
    }

    const startDate = new Date(this.eventFormGroup.get('eventDate').value);
    const start = this.eventFormGroup.get('startTime').value.split(':');
    startDate.setHours(start[0]);
    startDate.setHours(start[2]);

    const endDate = new Date(this.eventFormGroup.get('eventDate').value);
    const end = this.eventFormGroup.get('startTime').value.split(':');
    endDate.setHours(end[0]);
    endDate.setHours(end[2]);

    const tags = Array.from<string>(this.eventFormGroup.get('tags').value);

    let command: ICreateEventCommand & IUpdateEventCommand = {
      name: this.eventFormGroup.get('name').value,
      tags: tags,
      organizerEmail: organizer?.emailAssociaton,
      start: startDate.toUTCString(),
      end: endDate.toUTCString(),
    };
    if (this.data.edit) {
      command.id = this.data.edit.id;
    }
    return command;
  }
}

export interface EventFormDialogData {
  edit?: EventDetailDto;
  suggestedOrganizer?: PersonDetailVm[];
  suggestedTags: string[];
  startingTags?: string[];
}
