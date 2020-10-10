import { Component, OnInit } from '@angular/core';
import { PersonApiService } from '../services/api/person-api.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  public personalTableData: PersonListItem[];

  public searchValue= '';

  public selectedPerson: PersonListItem;

  constructor(private personApi: PersonApiService) {}

  ngOnInit(): void {
    this.doRefresh();
  }

  createPerson() {
    // TODO: API Anbindung
  }

  changeDisplayedPerson(persId: number){
    this.selectedPerson = this.personalTableData.find((val)=>val.personID === persId);
  }

  doRefresh(){
    this.personalTableData = this.personApi.getPersonalTableData();
  }

}

export interface PersonListItem{
  personID: number
  firstName: string;
  lastName: string;
  personsMemberStatus: string;
  personsCareerLevel: string;
  personsPosition: string;
}



