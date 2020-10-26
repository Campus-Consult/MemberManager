import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Person } from "../models/person.class";
import { PeopleApiService } from "../services/api/person-api.service";
import { CreatePersonComponent } from "./create-person/create-person.component";
import { EditPersonalDataComponent } from "./edit-pesonal-data/edit-pesonal-data.component";

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

  constructor(private personApi: PeopleApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.doRefresh();
  }

  onCreate() {
    let dialogRef = this.dialog.open(CreatePersonComponent, {
      height: "600px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.personApi.createPerson(result);
      console.log(`Dialog result: ${result}`);
    });
  }

  onEdit(person: Person) {
    const persId = this.selectedPerson.personID;
    let dialogRef = this.dialog.open(EditPersonalDataComponent, {
      height: "600px",
      width: "600px",
      data: person,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.personApi.editPerson(persId, result);
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }

  onChangeDisplayedPerson(persId: number) {
    this.selectedPerson = this.personalTableData.find(
      (val) => val.personID === persId
    );
  }

  doRefresh() {
    // TODO: Implement Refresh => ngchange in List!

    /*     this.personApi.getPersonaLookUpData().subscribe(
      (val) => {
        // TODO: Loading; Transfer into personalList?
        this.personalTableData = val;
      },
      (err) => console.error(err)
    );*/

    this.personalTableData = this.personApi.getPersonaLookUpData();
  }

  getDialogSizeConfig(): MatDialogConfig {
    let height: string;
    let width: string;

    if (window.screenY <= 600) {
      //mobile fullscreen
      //max-height:
    }
    return { maxHeight: height, maxWidth: width };
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
