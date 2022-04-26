import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  CareerLevelDto,
  CareerLevelLookupDto,
  Gender,
  ICareerLevelLookupDto,
  IMemberStatusLookupDto,
  IPersonDetailVm,
  MemberStatusLookupDto,
  PersonDetailVm,
} from 'src/app/membermanager-api';
import { MemberstatusCareerlevelService } from 'src/app/memberstatus-careerlevel.service';

/**
 * Form Template To Create or Edit Member
 */
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit, OnChanges {
  @Input() memberData?: IPersonDetailVm;
  @Input() formDisabled?: boolean;

  // we only have to show the controls for initial status/career level on create
  @Input() isCreate?: boolean = false;
  careerLevels: ICareerLevelLookupDto[];
  memberStatus: IMemberStatusLookupDto[];

  genders = [
    { value: Gender.MALE, viewValue: 'Männlich' },
    { value: Gender.FEMALE, viewValue: 'Weiblich' },
    { value: Gender.DIVERS, viewValue: 'Divers' },
  ];

  personalForm: FormGroup;

  constructor(
    protected memberStatusCareerLevelService: MemberstatusCareerlevelService
  ) {
    const formGroupInputs = {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthdate: new FormControl(),
      gender: new FormControl('', Validators.required),
      emailPrivate: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      emailAssociaton: new FormControl('@campus-consult.org', [
        Validators.required,
        Validators.email,
      ]),
      mobilePrivate: new FormControl(),
      adressStreet: new FormControl(),
      adressNr: new FormControl(),
      adressZIP: new FormControl('33100'),
      adressCity: new FormControl('Paderborn'),
    };

    this.personalForm = new FormGroup(formGroupInputs);
  }

  ngOnInit(): void {
    if (this.memberData) {
      this.addPersonalDataToForm();
    }
    if (this.isCreate) {
      this.personalForm.addControl('initialMemberStatusId', new FormControl());
      this.personalForm.addControl('initialCareerLevelId', new FormControl());
      this.personalForm.addControl('joinDate', new FormControl(new Date()));
      this.memberStatusCareerLevelService
        .doLoad()
        .then(([memberStatus, careerlLevels]) => {
          this.memberStatus = memberStatus;
          this.careerLevels = careerlLevels;
          this.personalForm.patchValue({
            initialMemberStatusId: this.memberStatus[0].id,
            initialCareerLevelId: this.careerLevels[0].id,
          });
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.formDisabled && this.personalForm.enabled) {
      this.personalForm.disable();
    } else if (this.personalForm.disabled) this.personalForm.enable();
  }

  addPersonalDataToForm() {
    this.personalForm.setValue({
      firstName: this.memberData.firstName,
      lastName: this.memberData.surname,
      // hack to remove the time
      birthdate: this.memberData.birthdate?.slice(0, 10) || '',
      gender: this.memberData.gender,
      emailPrivate: this.memberData.emailPrivate || '',
      emailAssociaton: this.memberData.emailAssociaton || '',
      mobilePrivate: this.memberData.mobilePrivate || '',
      adressStreet: this.memberData.adressStreet || '',
      adressNr: this.memberData.adressNo || '',
      adressZIP: this.memberData.adressZIP || '',
      adressCity: this.memberData.adressCity || '',
    });
  }
}
