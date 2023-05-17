import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import {
  EventDetailDto,
  IPersonLookupDto,
  IUpdateEventCommand,
} from 'src/app/membermanager-api';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';
import { ICreateEventCommand } from './../../../membermanager-api';

/**
 * Event Form is a dialog form to perform a Create or Edit action.
 * Depending on given MAT_DIALOG_DATA input in particular
 * if EventFormDialogData.edit is set it performs as a edit dialog
 * else it performs as an create Dialog.
 * Depending on mode the dialog will return onDismiss different results
 * if EventFormDialogData.edit is set it will return an IUpdateEventCommand
 * else it will return an ICreateEventCommand
 * in all modes it will return undefined if the dialog abort is pressed.
 */
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  suggTags: string[];
  startingTags: Set<string>;
  tagsOnEvent: Set<string>;

  formError;

  // Auto Complete Observables, which handle valueChangeEvents
  filteredTagOptions: Observable<string[]>;
  filteredOrgaOptions: Observable<IPersonLookupDto[]>;

  eventFormGroup: FormGroup;
  eventDate: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.suggTags = this.data.suggestedTags;
    this.startingTags = new Set(this.data.startingTags);
    this.tagsOnEvent = new Set(this.data.startingTags);

    this.eventDate = this.formBuilder.group({
      start: [Date.now(), [Validators.required]],
      end: [Date.now(), [Validators.required]],
    });

    this.eventFormGroup = this.formBuilder.group({
      name: ['Vereinstreffen', [Validators.required]],
      tags: [[this.tagsOnEvent]],
      tagInput: [''],
      organizer: ['', [Validators.required]],
      eventDate: this.eventDate,
      startTime: ['20:00', [Validators.required]],
      endTime: ['22:00', [Validators.required]],
    });

    // Set Value in Edit Case
    const eventEdit = this.data.edit;
    if (eventEdit) {
      this.tagsOnEvent = new Set(eventEdit.tags);

      const startDate = new Date(eventEdit.start);
      const endDate = new Date(eventEdit.end);
      const start = startDate.toLocaleTimeString();
      const end = endDate.toLocaleTimeString();
      this.eventFormGroup.setValue({
        name: eventEdit.name,
        organizer: eventEdit?.organizer,
        eventDate: { start: startDate, end: endDate },
        startTime: start,
        endTime: end,
        tags: eventEdit.tags,
        tagInput: '',
      });
    }

    // Filter Observable for tags
    this.filteredTagOptions = this.eventFormGroup.valueChanges.pipe(
      pluck('tagInput'),
      startWith(''),
      map((value) => this._filterTags(value || ''))
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

  /**
   * Submits ICreateEventCommand or IUpdateEventCommand it depends on form mode
   */
  onSubmit() {
    if (this.eventFormGroup.status) {
      const command = this.getCommand();
      this.data.submitAction(command).subscribe(
        (response) => {
          this.dialogRef.close(command);
        },
        (errorResponse) => this.handleError(errorResponse)
      );
    }
  }

  getCommand(): ICreateEventCommand & IUpdateEventCommand {
    let organizer = this.eventFormGroup.get('organizer').value;
    if (!organizer) {
      organizer = undefined;
    } else if (typeof organizer === 'object') {
      organizer = organizer?.emailAssociaton;
    }

    const startDate = new Date(this.eventDate.get('start').value);
    const start = this.eventFormGroup.get('startTime').value.split(':');
    startDate.setHours(start[0]);
    startDate.setMinutes(start[1]);

    const endDate = new Date(
      this.eventFormGroup.get('eventDate').get('end').value
    );
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
    this.formError = error;
    console.error(error);

    return of(false);
  }

  private _filterTags(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.suggTags.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

export interface EventFormDialogData {
  edit?: EventDetailDto;
  suggestedTags: string[];
  startingTags?: string[];
  submitAction: (
    result: IUpdateEventCommand & ICreateEventCommand
  ) => Observable<any>;
  onSuccess: (response) => void;
  onError: (response) => void;
}
