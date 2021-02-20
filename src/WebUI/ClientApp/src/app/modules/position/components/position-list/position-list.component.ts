import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PositionClient, PositionLookupDto } from '../../../../membermanager-api';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: [
    './position-list.component.scss']
})

export class PositionListComponent implements AfterViewInit {

  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  @ViewChild(DataTableComponent) dataTable: DataTableComponent<PositionLookupDto>;

  @Output() onSelectEvent = new EventEmitter<PositionLookupDto>();


  positions: PositionLookupDto[];
  dataSource: MatTableDataSource<PositionLookupDto>;
  columns: string[] = ['name', 'shortName', 'isActive', 'countAssignees'];

  selected: PositionLookupDto;

  constructor(private positionClient: PositionClient) { }

  ngAfterViewInit() {

    this.positionClient.get().subscribe(
      result => {
        this.positions = result.positions;
        this.dataSource = new MatTableDataSource<PositionLookupDto>(result.positions);
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    );
  }

  onSelect(item: PositionLookupDto) {
    this.selected = item;
    this.onSelectEvent.emit(item);
  }

  reload() {
    this.positionClient.get().subscribe(
      result => {
        this.positions = result.positions;
        this.dataSource = new MatTableDataSource<PositionLookupDto>(result.positions);
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    );
  }
}
