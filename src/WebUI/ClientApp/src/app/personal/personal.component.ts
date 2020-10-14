import { Component, OnInit } from "@angular/core";
import { PeopleApiService } from "../services/api/person-api.service";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
})
export class PersonalComponent implements OnInit {
  public personalTableData: PersonListItem[];

  public searchValue = "";

  // View 
  public selectedPerson: PersonListItem;
  public isCreatingMember: boolean = false;
  public isEditingMember: boolean = false;

  constructor(private personApi: PeopleApiService) {}

  ngOnInit(): void {
    this.doRefresh();
  }

  createPerson() {
    // TODO: API Anbindung
    this.isCreatingMember = true;
    this.isEditingMember = true;
    // will be set back to false on completionEvent, see view html
  }

  editPerson(persId: number) {
    // TODO: API Anbindung
    if (persId === this.selectedPerson.personID) {
      this.isEditingMember = true;
      // will be set back to false on completionEvent, see view html
    } else{
      // TODO: handeln?
      console.warn('editPerson: PersonID is not the same in selectedPerson');
    }
    this.isCreatingMember = true;
  }


  changeDisplayedPerson(persId: number) {
    this.selectedPerson = this.personalTableData.find(
      (val) => val.personID === persId
    );
  }

  doRefresh() {
    this.personApi.getPersonaLookUpData().subscribe(
      (val) => {
        // TODO: Loading; Transfer into personalList?
        this.personalTableData = val;
      },
      (err) => console.error(err)
    );
  }
}

export interface PersonListItem {
  personID: number;
  firstName: string;
  lastName: string;
  personsMemberStatus: string;
  personsCareerLevel: string;
  personsPosition: string;
}
