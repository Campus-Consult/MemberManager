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

  rowLabels = new Array<string>()

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
     * rowlables determines the display order and the labes which will be displayed
     */
    let label = "Vorname";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.firstName);

    label = "Nachname";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.surname);

    label = "Geburtstag";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.birthdate);

    label = "Geschlecht";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.gender);

    label = "E-Mail (Campus Consult)";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label,!this.memberDetails ? undefined : this.emailAssociaton);

    label = "E-Mail (privat)";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.emailPrivate);

    label = "Straße, Hausnummer";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.strasseHausNr );

    label = "PLZ, Stadt";
    this.rowLabels.push(label);
    this.rowLabelDateMap.set(label, !this.memberDetails ? undefined : this.plzStadt);
  }

  public get firstName(): string {
    return this.memberDetails.firstName;
  }

  public get surname(): string {
    return this.memberDetails.surname;
  }

  get birthdate(): string {
    return this.memberDetails.birthdate
      ? this.memberDetails.birthdate.toLocaleDateString()
      : "-";
  }

  get gender(): string {
    const gender = this.memberDetails.gender;
    let string = "Did you just assume my gender?!";
    switch (gender) {
      case Gender.MALE:
        string = "Männlich";
        break;
      case Gender.FEMALE:
        string = "Weiblich";
        break;
      case Gender.DIVERS:
        string = "Divers";
        break;
      default:
        string = "No Gender";
        break;
    }
    return string;
  }

  public get emailAssociaton(): string {
    return this.memberDetails.emailAssociaton;
  }

  public get emailPrivate(): string {
    return this.memberDetails.emailPrivate;
  }

  get strasseHausNr(): string {
    let value = "";
    if (this.memberDetails.adressStreet && this.memberDetails.adressNo)
      value =
        this.memberDetails.adressStreet + ", " + this.memberDetails.adressNo;
    else if (this.memberDetails.adressStreet)
      value = this.memberDetails.adressNo + " -";
    else if (this.memberDetails.adressNo)
      value = "- , " + this.memberDetails.adressStreet;
    return value;
  }

  get plzStadt(): string {
    let value: string;
    if (this.memberDetails.adressZIP && this.memberDetails.adressCity)
      value =
        this.memberDetails.adressZIP + ", " + this.memberDetails.adressCity;
    else if (this.memberDetails.adressZIP)
      value = this.memberDetails.adressZIP + " -";
    else if (this.memberDetails.adressCity)
      value = "- , " + this.memberDetails.adressCity;
    return value;
  }
}
