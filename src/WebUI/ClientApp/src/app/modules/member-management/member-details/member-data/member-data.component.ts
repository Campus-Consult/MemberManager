import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Gender, IPersonDetailVm } from "src/app/membermanager-api";

@Component({
  selector: "app-member-data",
  templateUrl: "./member-data.component.html",
  styleUrls: ["./member-data.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDataComponent implements OnInit, OnChanges {
  @Input()
  memberDetails: IPersonDetailVm;

  rowLabels = new Array<string>();

  rowLabelDateMap = new Map<string, string>();

  constructor() {}

  ngOnInit(): void {
    this.initRowData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initRowData();
  }

  initRowData() {
    this.rowLabels = [];

    /**
     * !this.memberDetails? undefined : value
     * because of initDataRow can be called if this.memberDetails undefined,
     * but keyList wil be used for displaying
     *
     * rowlables determines the display order and the label which will be displayed
     */
    let label = "Vorname";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.firstName
    );

    label = "Nachname";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.surname
    );

    label = "Geburtstag";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.birthdate
    );

    label = "Geschlecht";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.gender
    );

    label = "E-Mail (Campus Consult)";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.emailAssociaton
    );

    label = "E-Mail (privat)";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.emailPrivate
    );

    label = "Telefonnummer (privat)";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.telefon
    );

    label = "Straße, Hausnummer";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.strasseHausNr
    );

    label = "PLZ, Stadt";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(
      label,
      !this.memberDetails ? undefined : this.plzStadt
    );
  }

  public get firstName(): string {
    return this.memberDetails.firstName;
  }

  public get surname(): string {
    return this.memberDetails.surname;
  }

  get birthdate(): string {
    if (this.memberDetails.birthdate) {
      return new Date(this.memberDetails.birthdate).toLocaleDateString();
    } else {
      return "-";
    }
  }

  get gender(): string {
    const gender = this.memberDetails.gender;
    switch (gender) {
      case Gender.MALE:
        return "Männlich";
      case Gender.FEMALE:
        return "Weiblich";
      case Gender.DIVERS:
        return "Divers";
      default:
        return "No Gender";
    }
  }

  public get emailAssociaton(): string {
    return this.memberDetails.emailAssociaton;
  }

  public get emailPrivate(): string {
    return this.memberDetails.emailPrivate;
  }

  public get telefon(): string {
    return this.memberDetails.mobilePrivate;
  }

  get strasseHausNr(): string {
    if (this.memberDetails.adressStreet && this.memberDetails.adressNo) {
      return (
        this.memberDetails.adressStreet + ", " + this.memberDetails.adressNo
      );
    } else if (this.memberDetails.adressStreet) {
      return this.memberDetails.adressNo + " -";
    } else if (this.memberDetails.adressNo) {
      return "- , " + this.memberDetails.adressStreet;
    }
  }

  get plzStadt(): string {
    if (this.memberDetails.adressZIP && this.memberDetails.adressCity) {
      return (
        this.memberDetails.adressZIP + ", " + this.memberDetails.adressCity
      );
    } else if (this.memberDetails.adressZIP) {
      return this.memberDetails.adressZIP + " -";
    } else if (this.memberDetails.adressCity) {
      return "- , " + this.memberDetails.adressCity;
    }
  }
}
