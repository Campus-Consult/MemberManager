import { HistoryDialogComponent } from './history-dialog/history-dialog.component';
import { HistoryPanelsComponent } from './history-panels/history-panels.component';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  IPersonWithBasicInfoLookupDto,
  IPersonDetailVm,
  PeopleClient,
} from "src/app/membermanager-api";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-person-details",
  templateUrl: "./member-data-sheet.component.html",
  styleUrls: ["./member-data-sheet.component.scss"],
})
export class MemberDataSheetComponent implements OnInit, OnChanges {
  @Input()
  person: IPersonWithBasicInfoLookupDto;

  @Output()
  editEvent = new EventEmitter<IPersonDetailVm>();

  public personDetails: IPersonDetailVm;

  public displayedName: string;
  private loadingPerson = false;

  constructor(private personApi: PeopleClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedName = "No Person Selected";
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === "personId") {
        const chng = changes[propName];
        this.person = chng.currentValue;
      }
    }

    // Load person Details
    if (this.person) {
      this.loadPersondata();
      this.displayedName = this.getFullName();
    }
  }

  loadPersondata() {
    this.loadingPerson = true;
    this.personApi.get2(Number(this.person.id)).subscribe((person) => {
      this.personDetails = person;
      this.loadingPerson = false;
    });
  }

  getFullName(): string {
    let fullname = "";
    if (this.person.fistName) {
      fullname = fullname + this.person.fistName;
    }
    if (this.person.fistName) {
      fullname = fullname + " " + this.person.surname;
    }
    return fullname;
  }

  onEdit() {
    this.editEvent.emit(this.personDetails);
  }

  onShowHistoryButtonClicked() {
    let dialogRef = this.dialog.open(HistoryDialogComponent, {
      data: { person: this.personDetails },
      width: '600px',
    });
  }
}
