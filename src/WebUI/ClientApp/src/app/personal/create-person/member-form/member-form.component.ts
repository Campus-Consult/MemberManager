import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Gender, PersonDetailVm } from 'src/app/membermanager-api';

/**
 * Form Template To Create or Edit Member
 */
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

  @Input() memberData?: PersonDetailVm;

  genders = [
    {value: Gender.MALE, viewValue: 'Männlich'},
    {value: Gender.FEMALE, viewValue: 'Weiblich'},
    {value: Gender.DIVERS, viewValue: 'Divers'}
  ];

  personalForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('',Validators.required),
    birthdate: new FormControl(),
    gender: new FormControl('',Validators.required),
    emailPrivate: new FormControl('',[Validators.required, Validators.email]),
    emailAssociaton: new FormControl('@campus-consult.org',[Validators.required, Validators.email]),
    mobilePrivate: new FormControl(),
    adressStreet: new FormControl(),
    adressNr: new FormControl(),
    adressZIP: new FormControl(),
    adressCity: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
    if (this.memberData) {
      this.addPersonalDataToForm();
    }
  }

  addPersonalDataToForm() {
      this.personalForm.setValue({
        firstName: this.memberData.firstName,
        lastName: this.memberData.surname,
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
        adressNr: this.memberData.adressNo
          ? this.memberData.adressNo
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
