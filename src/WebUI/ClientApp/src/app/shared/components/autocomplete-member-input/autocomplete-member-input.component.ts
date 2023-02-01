import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, startWith, map } from 'rxjs/operators';
import {
  IPersonLookupDto,
  PeopleClient,
  PersonLookupDto,
} from 'src/app/membermanager-api';

@Component({
  selector: 'app-autocomplete-member-input',
  templateUrl: './autocomplete-member-input.component.html',
  styleUrls: ['./autocomplete-member-input.component.scss'],
})
export class AutocompleteMemberInputComponent implements OnInit {
  @Input()
  formGroup: FormGroup;

  @Input()
  fControlName: string = 'member';

  filteredMemberOptions: Observable<IPersonLookupDto[]>;

  suggMember: PersonLookupDto[] = [];

  formControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private memberClient: PeopleClient
  ) {}

  ngOnInit(): void {
    // Init Suggested Organizer, default load People
    this.memberClient.get().subscribe((data) => {
      this.suggMember = data.people;
    });

    if (!this.fControlName || this.fControlName === 'member') {
      console.warn(
        'AutoCompleteMemberInputComponent: formControlName Input not set. Assuming control does not exist create and add own control'
      );
      this.formGroup.setControl(this.fControlName, this.formBuilder.control(''));
    }

    this.formControl = this.formGroup.get(this.fControlName) as FormControl;

    this.filteredMemberOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name =
          typeof value === 'string' ? value : this.displayMemberFn(value);
        return this._filterMember(name);
      })
    );
  }

  displayMemberFn(person: IPersonLookupDto): string {
    return person ? `${person.firstName} ${person.surname}` : '';
  }

  private _filterMember(person: string): IPersonLookupDto[] {
    const filterValue = person.toLowerCase();
    return this.suggMember.filter((option) =>
      this.displayMemberFn(option).toLowerCase().includes(filterValue)
    );
  }
}
