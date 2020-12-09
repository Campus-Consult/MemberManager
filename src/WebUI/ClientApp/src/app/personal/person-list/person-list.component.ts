import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IPersonBasicInfoLookupDto, IPersonLookupDto, PeopleBasicInfoVm, PeopleClient, PersonBasicInfoLookupDto } from 'src/app/membermanager-api';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit, OnChanges {
  personalData: PersonBasicInfoLookupDto[];

  dataSource: MatTableDataSource<IPersonBasicInfoLookupDto>;

  @Input()
  displayedColumns?: string[];

  @Output()
  detailEvent = new EventEmitter<IPersonBasicInfoLookupDto>();

  @Output()
  createNewEvent = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  public selectedPerson: IPersonBasicInfoLookupDto;
  
  public searchValue = '';

  public isRefreshing = false;

  constructor(private personApi: PeopleClient ) {}

  ngOnInit(): void {
    // Loading Member
    this.onRefresh();

    if (!this.displayedColumns) {
      this.displayedColumns = [
        'firstName',
        'lastName',
        'currentMemberStatus',
        'currentCareerLevel',
        'currentPositions',
        'buttons'
      ];
    }

    this.dataSource = new MatTableDataSource(this.personalData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.personalData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** =============Person Action Methods ============== */

  onDetails(person: IPersonBasicInfoLookupDto) {
    this.selectedPerson = person;
    
    this.detailEvent.emit(this.selectedPerson);
  }

  onRefresh(){
    this.isRefreshing = true;
    this.personApi.getWithBasicInfo()
    .subscribe((val:PeopleBasicInfoVm) => {
      this.personalData = val.people;
      this.dataSource = new MatTableDataSource(this.personalData);
      this.isRefreshing = false;
    });
  }

  onCreate(){
    this.createNewEvent.emit();
  }

}
