import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  IPersonBasicInfoLookupDto,
  PeopleBasicInfoVm,
  PeopleClient,
  PersonBasicInfoLookupDto,
} from "src/app/membermanager-api";

export const PERSON_LIST_POSSIBLE_COLUMNS = [
  "firstName",
  "lastName",
  "currentMemberStatus",
  "currentCareerLevel",
  "currentPositions",
];

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"],
})
export class PersonListComponent implements OnInit, AfterViewInit {
  personalData: PersonBasicInfoLookupDto[];

  dataSource: MatTableDataSource<IPersonBasicInfoLookupDto>;

  @Input()
  displayedColumns?: string[];

  @Output()
  detailEvent = new EventEmitter<IPersonBasicInfoLookupDto>();

  // propertys for handling view when no dataSource
  loadingTable: boolean = true;
  loadingError = 'Error Happened';

  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  public selectedPerson: IPersonBasicInfoLookupDto;

  public isRefreshing = false;

  constructor(private personApi: PeopleClient) {}

  ngOnInit(): void {
    // Loading Member
    if (!this.displayedColumns) {
      this.displayedColumns = PERSON_LIST_POSSIBLE_COLUMNS;
    }
  }

  ngAfterViewInit() {
    this.loadingTable = true;
    this.personApi.getWithBasicInfo().subscribe(
      (val: PeopleBasicInfoVm) => {
        this.personalData = val.people;
        this.dataSource = new MatTableDataSource(this.personalData);
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

  onSelect(person: IPersonBasicInfoLookupDto) {
    this.selectedPerson = person;

    this.detailEvent.emit(this.selectedPerson);
  }

  refresh(): Observable<any> {
    this.isRefreshing = true;
    return this.personApi.getWithBasicInfo().pipe(
      map((val: PeopleBasicInfoVm) => {
        this.personalData = val.people;
        this.dataSource.data = this.personalData;
        this.isRefreshing = false;
      })
    );
  }
}
