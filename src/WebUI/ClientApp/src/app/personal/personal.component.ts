import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  IPersonBasicInfoLookupDto,
  IPersonDetailVm,
} from "../membermanager-api";
import { CreatePersonComponent } from "./create-person/create-person.component";
import { EditPersonalDataComponent } from "./edit-pesonal-data/edit-pesonal-data.component";
import { PersonListComponent } from "./person-list/person-list.component";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
})
export class PersonalComponent implements OnInit {
  @ViewChild(PersonListComponent) personListComp: PersonListComponent;

  // View
  public selectedPerson: IPersonBasicInfoLookupDto;

  refreshingList = false;

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

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

  onRefresh() {
    this.refreshingList = !this.refreshingList;
    this.personListComp.refresh().subscribe(
      () => {
        this._snackBar.open('Personenliste neugeladen', 'YAY!', {
          duration: 2000,
        });
        this.refreshingList = !this.refreshingList;
      },
      (err) => {
        console.error();
        this._snackBar.open('Personenliste neuladen fehlgeschlagen', 'Nooo!', {
          duration: 2000,
        });
        this.refreshingList = !this.refreshingList;
        this.refreshingList = !this.refreshingList;
      }
    );
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
