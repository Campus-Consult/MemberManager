import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {
  CreatePersonCommand,
  ICreatePersonCommand,
  IPersonDetailVm,
  IPersonLookupDto,
  IUpdatePersonCommand,
  PeopleClient,
  PositionLookupDto,
  UpdatePersonCommand,
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
  public selectedPerson: IPersonLookupDto;

  constructor(private personApi: PeopleClient, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onCreate() {
    let dialogRef = this.dialog.open(CreatePersonComponent, {
      height: "600px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.requestCReatePerson(result);
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
      this.requestEDitPerson(person.id, result);
    });
  }

  onChangeDisplayedPerson(selectedPerson: IPersonLookupDto) {
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

  // =================== API ===============
  // Are handled central in this. component

  private requestCReatePerson(formResult: any) {
    const command = this.convertCreateFormIntoCommand(formResult);
    this.personApi.create(command).subscribe(
      (val) => {},
      (err) => {
        console.error(err);
      }
    );
  }

  private convertCreateFormIntoCommand(formResult: any): CreatePersonCommand {
    const iCommand: ICreatePersonCommand = {
      // formresult is fromgroup.value, get value by fromgrou.<nameoFormControl> See personalForm (Formgruop) of memberFormComp
      firstName: formResult.firstName,
      surname: formResult.lastName,
      birthdate: formResult.birthdate,
      gender: formResult.gender,
      emailPrivate: formResult.emailPrivate,
      emailAssociaton: formResult.emailAssociaton,
      mobilePrivate: formResult.mobilePrivate,
      adressStreet: formResult.adressStreet,
      adressNo: formResult.adressNr,
      adressZIP: formResult.adressZIP,
      adressCity: formResult.adressCity,
    };
    console.warn("convertFormIntoCommand not implemented");
    return new CreatePersonCommand(iCommand);
  }

  private requestEDitPerson(personId: number, formresult: any) {
    const command = this.convertEditFormIntoCommand(formresult);
    this.personApi.update(personId,command).subscribe(
      (val) => {},
      (err) => {
        console.error(err);
      }
    );
  }

  private convertEditFormIntoCommand(formResult: any): UpdatePersonCommand {
    const iCommand: IUpdatePersonCommand = {
      // formresult is fromgroup.value, get value by fromgrou.<nameoFormControl> See personalForm (Formgruop) of memberFormComp
      firstName: formResult.firstName,
      surname: formResult.lastName,
      birthdate: formResult.birthdate,
      gender: formResult.gender,
      emailPrivate: formResult.emailPrivate,
      emailAssociaton: formResult.emailAssociaton,
      mobilePrivate: formResult.mobilePrivate,
      adressStreet: formResult.adressStreet,
      adressNo: formResult.adressNr,
      adressZIP: formResult.adressZIP,
      adressCity: formResult.adressCity,
    };
    console.warn("convertFormIntoCommand not implemented");
    return new UpdatePersonCommand(iCommand);
  }
}

export interface PersonListItem {
  person: IPersonLookupDto;
  personsMemberStatus: PositionLookupDto[];
  personsCareerLevel: PositionLookupDto[];
  personsPosition: PositionLookupDto[];
}
