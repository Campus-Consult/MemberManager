import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import {
  IPersonBasicInfoLookupDto,
  IPersonLookupDto,
  PeopleBasicInfoVm,
  PeopleClient,
  PersonBasicInfoLookupDto,
} from "src/app/membermanager-api";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

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
    this.personApi.getWithBasicInfo().subscribe(
      (val: PeopleBasicInfoVm) => {
        this.personalData = val.people;
        this.dataSource = new MatTableDataSource(this.personalData);
        this.dataSource.sort = this.sort;
        console.log("Read After View Inint");
      },
      (error) => console.error(error)
    );
  }

  /** =============Person Action Methods ============== */

  onSelect(person: IPersonBasicInfoLookupDto) {
    this.selectedPerson = person;

    this.detailEvent.emit(this.selectedPerson);
  }

  refresh(): Observable<any> {
    this.isRefreshing = true;
    return this.personApi.getWithBasicInfo().pipe(map((val: PeopleBasicInfoVm) => {
      this.personalData = val.people;
      this.dataSource.data = this.personalData;
      this.isRefreshing = false;
    }));
  }
}
