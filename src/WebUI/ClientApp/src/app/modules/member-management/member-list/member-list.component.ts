import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  IPersonWithBasicInfoLookupDto,
  PeopleClient,
  IPeopleWithBasicInfoVm,
  PersonWithBasicInfoLookupDto,
} from "src/app/membermanager-api";
import { CreateMemberComponent } from "../create-member/create-member.component";

export const PERSON_LIST_POSSIBLE_COLUMNS = [
  "fistName",
  "surname",
  "currentMemberStatus",
  "currentCareerLevel",
  "currentPositions",
];

@Component({
  selector: "app-person-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"],
})
export class MemberListComponent implements OnInit, AfterViewInit {
  personalData: PersonWithBasicInfoLookupDto[];

  dataSource: MatTableDataSource<PersonWithBasicInfoLookupDto>;

  @Input()
  displayedColumns?: string[];

  @Output()
  detailEvent = new EventEmitter<IPersonWithBasicInfoLookupDto>();

  // propertys for handling view when no dataSource
  loadingTable: boolean = true;
  loadingError = 'Error Happened';

  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  public selectedPerson: IPersonWithBasicInfoLookupDto;

  public isRefreshing = false;

  constructor(private personApi: PeopleClient, private _snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Loading Member
    if (!this.displayedColumns) {
      this.displayedColumns = PERSON_LIST_POSSIBLE_COLUMNS;
    }
  }

  ngAfterViewInit() {
    this.loadingTable = true;
    this.personApi.getWithBasicInfo().subscribe(
      (val: IPeopleWithBasicInfoVm) => {
        this.personalData = val.people;
        this.dataSource = new MatTableDataSource<PersonWithBasicInfoLookupDto>(this.personalData);
        this.dataSource.sort = this.sort;
        this.loadingTable = false;
      },
      (error) => {
        this.loadingTable = false;
        this.loadingError = error;
      }
    );
  }

  /** =============Person Action Methods ============== */

  onSelect(person: IPersonWithBasicInfoLookupDto) {
    this.selectedPerson = person;

    this.detailEvent.emit(this.selectedPerson);
  }

  onCreate() {
    const dialogRef = this.dialog.open(CreateMemberComponent, {
      maxHeight: '800px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  onRefresh(){
    this.refresh().subscribe(
      () => {
        this._snackBar.open('Mitgliederliste neugeladen', 'YAY!', {
          duration: 2000,
        });
      },
      (err) => {
        console.error(err);
        this._snackBar.open('Mitgliederliste neuladen fehlgeschlagen', 'Nooo!', {
          duration: 2000,
        });
      }
    );
  }

  refresh(): Observable<any> {
    this.isRefreshing = true;
    return this.personApi.getWithBasicInfo().pipe(
      map((val: IPeopleWithBasicInfoVm) => {
        this.personalData = val.people;
        this.dataSource.data = this.personalData;
        this.isRefreshing = false;
      })
    );
  }
}

