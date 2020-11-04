import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { PersonListItem } from '../personal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PeopleApiService } from 'src/app/services/api/person-api.service';

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
  detailEvent = new EventEmitter<number>();

  @Output()
  createNewEvent = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  public selectedPerson: PersonListItem;
  
  public searchValue = '';

  public isRefreshing = false;

  constructor(private personApi: PeopleApiService ) {}

  ngOnInit(): void {
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
    // TODO: ste to false, when table really have chjanged his data!
    this.isRefreshing = false;
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

  onDetails(persID: number) {
    this.detailEvent.emit(persID);
  }

  onRefresh(){
    this.personApi
    .getPersonaLookUpData(true)
    .subscribe((val) => (this.personalData = val));
  }

  onCreate(){
    this.createNewEvent.emit();
    this.isRefreshing = true;
  }

}
