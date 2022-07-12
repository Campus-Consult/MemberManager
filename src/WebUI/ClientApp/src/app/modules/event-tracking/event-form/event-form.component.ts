import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { IPersonDetailVm, PersonDetailVm } from 'src/app/membermanager-api';
import { EventCodeDialogComponent } from '../event-code-dialog/event-code-dialog.component';
import { ICreateEventCommand } from './../../../membermanager-api';

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
  @Input()
  startingTags: Set<string> = new Set(['VT']);
  
  tagsOnEvent = this.startingTags;

  formError = { organizer: '' };

  // Auto Complete Observables, which handle valueChangeEvents
  filteredTagOptions: Observable<string[]>;
  filteredOrgaOptions: Observable<IPersonDetailVm[]>;

  eventFormGroup = this.formBuilder.group({
    name: ['Event', [Validators.required]],
    tags: [
      [this.tagsOnEvent],
      {
        validators: [Validators.required, (val) => this.isInternal(val)],
        updateOn: 'blur',
      },
    ],
    tagInput: [''],
    organizer: ['', [Validators.required]],
    eventDate: [Date.now(), [Validators.required]],
    startTime: ['20:00', [Validators.required]],
    endTime: ['22:00', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    /*     const sub = this.memberClient.get().subscribe((data) => {
      this.suggestedOrganizer = this.suggestedOrganizer.concat(data.people);
      sub.unsubscribe();
    }); */

    this.suggOrganizer = [
      {
        id: 0,
        firstName: 'Kevin',
        surname: 'Kvbe',
        emailAssociaton: 'aalf@cc.de',
      },
      {
        id: 1,
        firstName: 'Adrian',
        surname: 'rec',
        emailAssociaton: 'arec@cc.de',
      },
      {
        id: 2,
        firstName: 'chlor',
        surname: 'serbe',
        emailAssociaton: 'erbe@cc.de',
      },
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
    const filterValue = person.toLowerCase();
    return this.suggOrganizer.filter((option) =>
      this.displayOrganizerFn(option).toLowerCase().includes(filterValue)
    );
  }

  displayOrganizerFn(person: IPersonDetailVm): string {
    return person ? `${person.firstName} ${person.surname}` : '';
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
}
