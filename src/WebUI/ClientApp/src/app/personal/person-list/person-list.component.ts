import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PersonListItem } from '../personal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  @Input()
  personalData: PersonListItem[];

  dataSource: MatTableDataSource<PersonListItem>;

  @Input()
  displayedColumns?: string[];

  @Output()
  onDetail = new EventEmitter<number>();

  @Output()
  onRefresh = new EventEmitter();

  //dataSource = new MatTableDataSource<PersonTableData>(this.personalData);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  public selectedPerson: PersonListItem;

  
  public searchValue = '';


  constructor() {}

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** =============Person Action Methods ============== */

  details(persID: number) {
    this.onDetail.emit(persID);
  }

  refresh(){
    this.onRefresh.emit();
  }

}
