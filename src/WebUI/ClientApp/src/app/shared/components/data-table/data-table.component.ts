import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> implements AfterViewInit, AfterContentInit  {

  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  @Input() dataSource: MatTableDataSource<T>;
  @Input() columns: string[];

  @Output() onSelect = new EventEmitter<T>();

  selection: SelectionModel<T>;

  constructor() {
    const initialSelection = [];
    const allowMultiSelect = false;

    this.selection = new SelectionModel<T>(allowMultiSelect, initialSelection);

    // selection changed
    this.selection.changed.subscribe((a) => {
      console.log(a.added[0]);
      this.onSelect.emit(a.added[0] as T);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // after the <ng-content> has been initialized, the column definitions are available.
  // All that's left is to add them to the table ourselves:
  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
