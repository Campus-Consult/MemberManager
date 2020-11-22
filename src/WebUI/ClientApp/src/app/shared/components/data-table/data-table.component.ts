import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> implements OnInit, AfterViewInit  {
  @Input()
  data: T[];

  @Input()
  displayedColumns?: string[];

  @Input()
  selectable?: boolean;

  dataSource: MatTableDataSource<T>;
  selection: SelectionModel<T>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output()
  onSelect = new EventEmitter<string>();

  constructor() {
    const initialSelection = [];
    const allowMultiSelect = false;

    this.selection = new SelectionModel<T>(allowMultiSelect, initialSelection);

    // selection changed
    this.selection.changed.subscribe((a) => {
      // TODO
    });
  }

  ngOnInit(): void {
    if (!this.displayedColumns) {
      this.displayedColumns = [
        'name',
        'countAssignees',
      ];
    }

    this.dataSource = new MatTableDataSource<T>(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
