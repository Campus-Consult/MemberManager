import {
  ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges
} from '@angular/core';
import { Gender, IPersonDetailVm } from 'src/app/membermanager-api';

@Component({
  selector: 'app-member-data',
  templateUrl: './member-data.component.html',
  styleUrls: ['./member-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDataComponent implements OnInit, OnChanges {
  @Input()
  memberDetails: IPersonDetailVm;

  strasseHausNr: string;

  stadtPLZ: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.memberDetails) {
      this.memberDetails = this.getEmptypersonDetails();
    }
    this.strasseHausNr = this.getStrasseHausnr();
    this.stadtPLZ = this.getPLZStadt();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.memberDetails) {
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
    if(this.memberDetails.adressStreet && this.memberDetails.adressNo)
      value = this.memberDetails.adressStreet + ', ' + this.memberDetails.adressNo;
    else if(this.memberDetails.adressStreet)
      value = this.memberDetails.adressNo + ' -';
    else if(this.memberDetails.adressNo)
      value = '- , ' + this.memberDetails.adressStreet;
    return value;
  }

  private getPLZStadt():string {
    let value: string;
    if(this.memberDetails.adressZIP && this.memberDetails.adressCity)
      value = this.memberDetails.adressZIP + ', ' + this.memberDetails.adressCity;
    else if(this.memberDetails.adressZIP)
      value = this.memberDetails.adressZIP + ' -';
    else if(this.memberDetails.adressCity)
      value = '- , ' + this.memberDetails.adressCity;
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
