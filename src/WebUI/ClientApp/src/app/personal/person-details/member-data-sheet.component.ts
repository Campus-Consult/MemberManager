import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Person } from 'src/app/models/person.class';
import { PersonListItem } from '../personal.component';
import { PeopleApiService } from '../../services/api/person-api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './member-data-sheet.component.html',
  styleUrls: ['./member-data-sheet.component.scss'],
})
export class MemberDataSheetComponent implements OnInit, OnChanges {
  @Input()
  personTabledDTO: PersonListItem;

  @Output()
  editEvent = new EventEmitter<number>();

  personDetails: Person;

  public displayedName: string;

  constructor(private personApi: PeopleApiService) {}

  ngOnInit(): void {
    this.displayedName = this.personTabledDTO
      ? this.getFullName()
      : 'No Person Selected';
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName === 'personTabledDTO' && chng.currentValue) {
        this.personTabledDTO = chng.currentValue as PersonListItem;
      }
    }
    // Load person Details
    if (this.personTabledDTO) {
      this.displayedName = this.getFullName();
      this.personDetails = this.getPersondata();
    }
  }

  getPersondata(): Person {
    return this.personApi.getPerson(Number(this.personTabledDTO.person.id));
  }

  getFullName(): string {
    return this.personTabledDTO.person.fistName + ' ' + this.personTabledDTO.person.surname;
  }

  onEdit() {
    this.editEvent.emit(Number(this.personTabledDTO.person.id));
  }
}
