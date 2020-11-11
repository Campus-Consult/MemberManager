import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { PersonListItem } from '../personal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PeopleApiService } from 'src/app/services/api/person-api.service';
import { PersonLookupDto } from 'src/app/membermanager-api';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit, OnChanges {
  personalData: PersonListItem[];

  dataSource: MatTableDataSource<PersonListItem>;

  @Input()
  displayedColumns?: string[];

  @Output()
  detailEvent = new EventEmitter<PersonLookupDto>();

  @Output()
  createNewEvent = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  public selectedPerson: PersonLookupDto;
  
  public searchValue = '';

  public isRefreshing = false;

  constructor(private personApi: PeopleApiService ) {}

  ngOnInit(): void {
    // Loading Member
    this.onRefresh();

    if (!this.displayedColumns) {
      this.displayedColumns = [
        'firstName',
        'lastName',
        'personsMemberStatus',
        'personsCareerLevel',
        'personsPosition',
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

  onDetails(person: PersonLookupDto) {
    console.log(person);
    this.selectedPerson = person;
    
    this.detailEvent.emit(this.selectedPerson);
  }

  onRefresh(){
    this.isRefreshing = true;
    this.personApi
    .getPersonaLookUpData(true)
    .subscribe((val) => {
      this.personalData = val;
      this.dataSource = new MatTableDataSource(this.personalData);
      this.isRefreshing = false;
    });
  }

  onCreate(){
    this.createNewEvent.emit();
  }

}
