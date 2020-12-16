import {
  ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges
} from '@angular/core';
import { Gender, IPersonDetailVm } from 'src/app/membermanager-api';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnInit, OnChanges {
  @Input()
  personDetails: IPersonDetailVm;

  strasseHausNr: string;

  stadtPLZ: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.personDetails) {
      this.personDetails = this.getEmptypersonDetails();
    }
    this.strasseHausNr = this.getStrasseHausnr();
    this.stadtPLZ = this.getPLZStadt();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.personDetails) {
      this.strasseHausNr = this.getStrasseHausnr();
    this.stadtPLZ = this.getPLZStadt(); 
    }
  }

  getEmptypersonDetails(): IPersonDetailVm {
    return {
      firstName: undefined,
      surname: undefined,
      id: undefined,
    };
  }

  private getStrasseHausnr():string {
    let value = '';
    if(this.personDetails.adressStreet && this.personDetails.adressNo)
      value = this.personDetails.adressStreet + ', ' + this.personDetails.adressNo;
    else if(this.personDetails.adressStreet)
      value = this.personDetails.adressNo + ' -';
    else if(this.personDetails.adressNo)
      value = '- , ' + this.personDetails.adressStreet;
    return value;
  }

  private getPLZStadt():string {
    let value: string;
    if(this.personDetails.adressZIP && this.personDetails.adressCity)
      value = this.personDetails.adressZIP + ', ' + this.personDetails.adressCity;
    else if(this.personDetails.adressZIP)
      value = this.personDetails.adressZIP + ' -';
    else if(this.personDetails.adressCity)
      value = '- , ' + this.personDetails.adressCity;
    return value;
  }

  getGenderString(gender: Gender): string{
    let string = 'Did you just assume my gender?!';
    switch (gender) {
      case Gender.MALE:
        string = 'Männlich';
        break;
      case Gender.FEMALE:
        string = "Weiblich";
        break;
      case Gender.DIVERS:
        string = 'Divers';
        break;
      default:
        string = 'No Gender'
        break;
    }
    return string
  }
}
