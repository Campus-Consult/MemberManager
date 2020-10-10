import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Person } from 'src/app/models/person.class';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnInit {
  @Input()
  personDetails: Person;

  strasseHausNr: string;

  stadtPLZ: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.personDetails) {
      console.log('Werde ausgeführt');
      
      this.personDetails = this.getEmptypersonDetails();
    }
    console.log(this.personDetails);
    
    this.strasseHausNr = this.getStrasseHausnr();
    this.stadtPLZ = this.getPLZStadt();
  }

  getEmptypersonDetails(): Person {
    return {
      firstName: undefined,
      lastName: undefined,
      personID: undefined,
      personsCareerLevels: [],
      personsMemberStatus: [],
      personsPositions: [],
    };
  }

  private getStrasseHausnr():string {
    let value: string;
    if(this.personDetails.adressStreet && this.personDetails.adressNr)
      value = this.personDetails.adressStreet + ', ' + this.personDetails.adressNr;
    else if(this.personDetails.adressStreet)
      value = this.personDetails.adressNr + ' -';
    else if(this.personDetails.adressNr)
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
}
