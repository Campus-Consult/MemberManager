import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Person } from 'src/app/models/person.class';
import { PersonListItem } from '../personal.component';
import { PersonApiService } from '../../services/api/person-api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit, OnChanges {
  @Input()
  personTabledDTO: PersonListItem;

  personDetails: Person;

  public displayedName: string;

  constructor(private personApi: PersonApiService) {}

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
    return this.personApi.getPerson(this.personTabledDTO.personID);
  }

  getFullName(): string {
    return this.personTabledDTO.firstName + ' ' + this.personTabledDTO.lastName;
  }
}
