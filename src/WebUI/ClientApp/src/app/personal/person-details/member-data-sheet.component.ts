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
import { PeopleApiService } from '../../services/api/person-api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './member-data-sheet.component.html',
  styleUrls: ['./member-data-sheet.component.scss'],
})
export class MemberDataSheetComponent implements OnInit, OnChanges {
  @Input()
  personId: number;

  @Output()
  editEvent = new EventEmitter<number>();

  personDetails: Person;

  public displayedName: string;
  loadingString = 'loading...'

  constructor(private personApi: PeopleApiService) {}

  ngOnInit(): void {
    this.displayedName = this.personId
    ? this.loadingString
    : 'No Person Selected';  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName === 'personId') {
        this.personId = chng.currentValue;
      }
    }

    this.displayedName = this.loadingString;;
    
    // Load person Details
    if (this.personId) {
      this.loadPersondata();
    }
  }

  loadPersondata() {
    this.personApi.getPerson(this.personId).subscribe((person)=>{
      this.personDetails = person;   
      this.displayedName = this.getFullName();
    })
  }

  getFullName(): string {
    return this.personDetails.firstName + ' ' + this.personDetails.lastName;
  }

  onEdit() {
    this.editEvent.emit(this.personId);
  }
}
