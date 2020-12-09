import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {
  IPersonBasicInfoLookupDto,
  IPersonDetailVm,
} from "../membermanager-api";
import { CreatePersonComponent } from "./create-person/create-person.component";
import { EditPersonalDataComponent } from "./edit-pesonal-data/edit-pesonal-data.component";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
})
export class PersonalComponent implements OnInit {
  public searchValue = "";

  // View
  public selectedPerson: IPersonBasicInfoLookupDto;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onCreate() {
    let dialogRef = this.dialog.open(CreatePersonComponent, {
      height: "600px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      /* In Create Component verschoben
      this.requestCReatePerson(result); */
    });
  }

  onEdit(person: IPersonDetailVm) {
    let dialogRef = this.dialog.open(EditPersonalDataComponent, {
      height: "600px",
      width: "600px",
      data: person,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`); // Pizza!
      /* In Edit Component verschoben
      this.requestEDitPerson(person.id, result);
      */
    });
  }

  onChangeDisplayedPerson(selectedPerson: IPersonBasicInfoLookupDto) {
    this.selectedPerson = selectedPerson;
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
