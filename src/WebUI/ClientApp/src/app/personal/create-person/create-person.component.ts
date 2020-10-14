import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from 'src/app/models/person.class';
import { EditPetsonalDataComponent } from '../edit-pesonal-data/edit-pesonal-data.component';
import { MemberFormComponent } from './member-form/member-form.component';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {

  @Output() completionEvent = new EventEmitter();

  @ViewChild('memberForm') memberFormComp: MemberFormComponent;

  memberForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.memberForm = this.memberFormComp.personalForm;
  }

  onSubmit() {
    console.log(this.memberForm.value);
    this.completionEvent.emit();
  }

  onCancel() {
    this.completionEvent.emit();
  }

}
