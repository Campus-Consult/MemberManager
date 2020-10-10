import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { elementAt } from 'rxjs/operators';
import { Person } from 'src/app/models/person.class';
import { PersonalDataComponent } from '../personal-data/personal-data.component';

@Component({
  selector: 'app-edit-pesonal-data',
  templateUrl: './edit-pesonal-data.component.html',
  styleUrls: ['./edit-pesonal-data.component.scss'],
})
export class EditPetsonalDataComponent
  extends PersonalDataComponent
  implements OnInit {
  @Output() submitEvent = new EventEmitter<string>();

  @Output() cancelEvent = new EventEmitter();

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

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    if (this.personDetails) {
      this.addPersonalDataToForm();
    }
  }

  onSubmit() {
    console.log(this.personalForm.value);
  }

  onCancel() {}

  addPersonalDataToForm() {
    try {
      // todo: is working?
      this.personalForm.setValue(this.personDetails);
    } catch (error) {
      console.error(error);
      this.personalForm.setValue({
        firstName: this.personDetails.firstName,
        lastName: this.personDetails.lastName,
        birthdate: this.personDetails.birthdate
          ? this.personDetails.birthdate
          : '',
        gender: this.personDetails.gender ? this.personDetails.gender : '',
        emailPrivate: this.personDetails ? this.personDetails.emailPrivate : '',
        emailAssociaton: this.personDetails.emailAssociaton
          ? this.personDetails.emailAssociaton
          : '',
        mobilePrivate: this.personDetails.mobilePrivate
          ? this.personDetails.mobilePrivate
          : '',
        adressStreet: this.personDetails.adressStreet
          ? this.personDetails.adressStreet
          : '',
        adressNr: this.personDetails.adressNr
          ? this.personDetails.adressNr
          : '',
        adressZIP: this.personDetails.adressZIP
          ? this.personDetails.adressZIP
          : '',
        adressCity: this.personDetails.adressCity
          ? this.personDetails.adressCity
          : '',
      });
    }
  }

  /**
   * Nicht implemetiert!
   * Formcontrol names should be the same like Propertynames in personDetails, see dynamic @method initDynamicPersonalForm
   */
  initDynamicPersonalForm() {
    const form = this.fb.group({});
    if (this.personDetails) {
      for (const key in this.personDetails) {
        if (Object.prototype.hasOwnProperty.call(this.personDetails, key)) {
          const value = this.personDetails[key];

          if (value) {
            if ('number string'.includes(typeof value)) {
              form.addControl(key, new FormControl(value));
              this.personalForm.setValue({ key: value });
            } else {
              // TODO:
            }
          }
        }
      }
    }
  }
}
