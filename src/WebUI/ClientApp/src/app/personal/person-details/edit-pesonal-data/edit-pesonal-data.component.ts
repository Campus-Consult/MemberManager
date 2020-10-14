import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Person } from 'src/app/models/person.class';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-edit-pesonal-data',
  templateUrl: './edit-pesonal-data.component.html',
  styleUrls: ['./edit-pesonal-data.component.scss'],
})
export class EditPetsonalDataComponent implements OnInit {

  @Input() memberdata: Person;

  @ViewChild('memberForm') memberFormComp: MemberFormComponent;

  memberForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.memberForm = this.memberFormComp.personalForm;
  }

  onSubmit() {
    console.log(this.memberForm.value);
  }

  onCancel() {}
}
