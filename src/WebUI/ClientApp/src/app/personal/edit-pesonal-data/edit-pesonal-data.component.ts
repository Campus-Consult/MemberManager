import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Person } from 'src/app/models/person.class';
import { CreatePersonComponent } from '../create-person/create-person.component';
import { MemberFormComponent } from '../create-person/member-form/member-form.component';

@Component({
  selector: 'app-edit-pesonal-data',
  templateUrl: './edit-pesonal-data.component.html',
  styleUrls: ['./edit-pesonal-data.component.scss'],
})
export class EditPetsonalDataComponent extends CreatePersonComponent implements OnInit {

  @Input() memberdata: Person;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit()
  }
}
