import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Person } from 'src/app/models/person.class';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  @Input() memberData: Person;

  constructor() { }

  ngOnInit(): void {
    this.addPersonalDataToForm();
  }

  personalForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthdate: new FormControl(''),
    gender: new FormControl(''),
    emailPrivate: new FormControl(''),
    emailAssociaton: new FormControl(''),
    mobilePrivate: new FormControl(''),
    adressStreet: new FormControl(''),
    adressNr: new FormControl(''),
    adressZIP: new FormControl(''),
    adressCity: new FormControl(''),
  });

  addPersonalDataToForm() {
    try {
      // todo: is working?
      this.personalForm.setValue(this.memberData);
    } catch (error) {
      console.error(error);
      this.personalForm.setValue({
        firstName: this.memberData.firstName,
        lastName: this.memberData.lastName,
        birthdate: this.memberData.birthdate
          ? this.memberData.birthdate
          : '',
        gender: this.memberData.gender ? this.memberData.gender : '',
        emailPrivate: this.memberData ? this.memberData.emailPrivate : '',
        emailAssociaton: this.memberData.emailAssociaton
          ? this.memberData.emailAssociaton
          : '',
        mobilePrivate: this.memberData.mobilePrivate
          ? this.memberData.mobilePrivate
          : '',
        adressStreet: this.memberData.adressStreet
          ? this.memberData.adressStreet
          : '',
        adressNr: this.memberData.adressNr
          ? this.memberData.adressNr
          : '',
        adressZIP: this.memberData.adressZIP
          ? this.memberData.adressZIP
          : '',
        adressCity: this.memberData.adressCity
          ? this.memberData.adressCity
          : '',
      });
    }
  }

}
