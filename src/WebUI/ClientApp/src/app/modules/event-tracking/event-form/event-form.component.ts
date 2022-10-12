import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, pluck, startWith } from 'rxjs/operators';
import {
  CreateEventCommand,
  EventDetailDto,
  FileResponse,
  IPersonLookupDto,
  IUpdateEventCommand,
  PersonLookupDto,
} from 'src/app/membermanager-api';
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
  @Input() data: EventFormDialogData;

  @Output() submitEvent = new EventEmitter<
    ICreateEventCommand & IUpdateEventCommand
  >();

  suggOrganizer: PersonLookupDto[] = [];

  suggTags: string[];
  startingTags: Set<string>;
  tagsOnEvent: Set<string>;

  formError: EventFormError = {};

  // Auto Complete Observables, which handle valueChangeEvents
  filteredTagOptions: Observable<string[]>;
  filteredOrgaOptions: Observable<IPersonLookupDto[]>;

  eventFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private memberClient: PeopleClient
  ) {}

  ngOnInit(): void {
    this.suggTags = this.data.suggestedTags;
    this.startingTags = new Set(this.data.startingTags);
    this.tagsOnEvent = new Set(this.data.startingTags);
    // Init Suggested Organizer, default load People
    if (this.data.suggestedOrganizer?.length > 0) {
      this.suggOrganizer = this.data.suggestedOrganizer;
    } else {
      this.memberClient.get().subscribe((data) => {
        this.suggOrganizer = this.suggOrganizer.concat(data.people);
      });
    }

    const eventEdit = this.data.edit;
    this.eventFormGroup = this.formBuilder.group({
      name: ['Vereinstreffen', [Validators.required]],
      tags: [
        [this.tagsOnEvent],
        {
          validators: [
            Validators.required /* , (val) => this.isInternal(val) */,
          ],
          updateOn: 'blur',
        },
      ],
      tagInput: [''],
      organizer: ['', [Validators.required, Validators.email]],
      eventDate: [Date.now(), [Validators.required]],
      startTime: ['20:00', [Validators.required]],
      endTime: ['22:00', [Validators.required]],
    });
    if (eventEdit) {
      const startDate = new Date(eventEdit.start);
      const endDate = new Date(eventEdit.end);
      const start = this.formatTime(startDate);
      const end = this.formatTime(endDate);
      this.eventFormGroup.setValue({
        name: eventEdit.name,
        organizer: this.displayOrganizerFn(eventEdit?.organizer),
        eventDate: eventEdit.start,
        startTime: start,
        endTime: end,
        tags: eventEdit.tags,
        tagInput: '',
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

  private _filterOrga(person: string): IPersonLookupDto[] {
    const filterValue = person.toLowerCase();
    return this.suggOrganizer.filter((option) =>
      this.displayOrganizerFn(option).toLowerCase().includes(filterValue)
    );
  }

  displayOrganizerFn(person: IPersonLookupDto): string {
    // TODO: Check for also for emailAssociation in case user Inputs E-Mail!
    return person ? `${person.fistName} ${person.surname}` : '';
  }

  formatTime(dateTime: Date) {
    const split = dateTime.toUTCString().split(' ');
    return split[4];
  }

  onSubmit() {
    if (this.eventFormGroup.status) {
      const command = this.getCommand();
      this.data.submitAction(command).subscribe(
        (response) => {
          if (response) {
            this.submitEvent.emit(command);
          }
        },
        (errorResponse) => this.handleError(errorResponse)
      );
    }
  }

  isInternal(formControl: AbstractControl): ValidationErrors | null {
    const isInternalOrganizer =
      this.suggOrganizer.findIndex(
        (value) => formControl.value.id === value.id
      ) > -1;
    this.formError.OrganizerEmail = isInternalOrganizer
      ? ''
      : 'Person existiert nicht im Member Manager oder ist Teil von CC';
    return isInternalOrganizer
      ? { forbiddenName: { value: formControl.value } }
      : null;
  }

  getCommand(): ICreateEventCommand & IUpdateEventCommand {
    let organizer = this.eventFormGroup.get('organizer').value;
    if (!organizer) {
      organizer = undefined;
    } else if (typeof organizer === 'object') {
      organizer = organizer?.emailAssociaton;
    }

    const startDate = new Date(this.eventFormGroup.get('eventDate').value);
    const start = this.eventFormGroup.get('startTime').value.split(':');
    startDate.setHours(start[0]);
    startDate.setMinutes(start[1]);

    const endDate = new Date(this.eventFormGroup.get('eventDate').value);
    const end = this.eventFormGroup.get('endTime').value.split(':');
    endDate.setHours(end[0]);
    endDate.setMinutes(end[1]);

    const tags = Array.from<string>(this.eventFormGroup.get('tags').value);

    let command: ICreateEventCommand & IUpdateEventCommand = {
      name: this.eventFormGroup.get('name').value,
      tags: Array.from(this.tagsOnEvent),
      organizerEmail: organizer,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    if (this.data.edit) {
      command.id = this.data.edit.id;
    }
    return command;
  }

  handleError(error) {
    let parsedErrorObject: any;
    // Intercept Normal Error
    /*     if (error?.response) {
      parsedErrorObject = JSON.parse(error.response);
    } */
    this.formError = error;

    return of(false);
  }
}

export interface EventFormDialogData {
  edit?: EventDetailDto;
  suggestedOrganizer?: PersonLookupDto[];
  suggestedTags: string[];
  startingTags?: string[];
  submitAction: (
    result: IUpdateEventCommand & ICreateEventCommand
  ) => Observable<any>;
  onSuccess: (response) => void;
  onError: (response) => void;
}

export interface EventFormError {
  name?: string;
  OrganizerEmail?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  tags?: string;
}
