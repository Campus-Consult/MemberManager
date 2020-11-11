import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PersonLookupDto } from 'src/app/membermanager-api';
import { Person } from 'src/app/models/person.class';
import { PeopleApiService } from '../../services/api/person-api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './member-data-sheet.component.html',
  styleUrls: ['./member-data-sheet.component.scss'],
})
export class MemberDataSheetComponent implements OnInit, OnChanges {
  @Input()
  person: PersonLookupDto;

  @Output()
  editEvent = new EventEmitter<number>();

  private personDetails: Person;

  public displayedName: string;
  private loadingPerson = false;

  constructor(private personApi: PeopleApiService) {}

  ngOnInit(): void {
    this.displayedName = 'No Person Selected';  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName === 'personId') {
        this.person = chng.currentValue;
      }
    }
  
    // Load person Details
    if (this.person) {
      this.loadPersondata();
      this.displayedName = this.getFullName();
    }
  }

  loadPersondata() {
    this.loadingPerson = true;
    this.personApi.getPerson(Number(this.person.id)).subscribe((person)=>{
      this.personDetails = person;   
      console.log(this.personDetails);
      this.loadingPerson = false;
    })
  }

  getFullName(): string {
    let fullname = ''
    if (this.person.fistName) {
      fullname = fullname + this.person.fistName;
    }
    if (this.person.fistName) {
      fullname = fullname + ' ' + this.person.surname
    }
    return fullname;
  }

  onEdit() {
    this.editEvent.emit(Number(this.person.id));
  }
}
