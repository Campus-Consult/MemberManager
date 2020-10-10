import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/models/person.class';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  @Input()
  personDetails: Person;

  public displayedSubtitle: string;

  constructor() { }

  ngOnInit(): void {
    this.displayedSubtitle = this.personDetails.firstName + ' ' + this.personDetails.lastName;
  }

}
