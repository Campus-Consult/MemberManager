import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  CareerLevelClient,
  CareerLevelLookupDto,
  MemberStatusLookupDto,
} from 'src/app/membermanager-api';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { CreateCareerLevelDialogComponent } from './../create-career-level-dialog/create-career-level-dialog.component';

@Component({
  selector: 'app-career-level-list',
  templateUrl: './career-level-list.component.html',
  styleUrls: ['./career-level-list.component.scss'],
})
export class CareerLevelListComponent implements AfterViewInit {
  private sort: MatSort;

  // CarreerLevel order Trainee < Associate < Junior Consultant < Consultant < Senior Consultant < Partner
  // Change order here uses name and compares string
  public careerLevelOrder = [
    'Trainee',
    'Associate',
    'Junior Consultant',
    'Consultant',
    'Senior Consultant',
    'Partner',
  ];

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  @ViewChild(DataTableComponent)
  dataTable: DataTableComponent<CareerLevelLookupDto>;

  @Output() onSelectEvent = new EventEmitter<CareerLevelLookupDto>();

  careerLevels: CareerLevelLookupDto[];
  dataSource: MatTableDataSource<CareerLevelLookupDto>;
  columns: string[] = ['name', 'shortName', 'countAssignees'];

  selected: MemberStatusLookupDto;

  constructor(
    private careerLevelClient: CareerLevelClient,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.reload();
  }

  onSelect(item: CareerLevelLookupDto) {
    this.selected = item;
    this.onSelectEvent.emit(item);
  }

  onCreate() {
    let dialogRef = this.dialog.open(CreateCareerLevelDialogComponent, {
      data: { description: 'Erstelle Karrierelevel' },
    });

    const sub = dialogRef.afterClosed().subscribe((result) => {
      this.reload();
      sub.unsubscribe();
    });
  }

  reload() {
    const observer = {
      next: (result) => {
        this.careerLevels = result.careerLevels;
        this.dataSource = new MatTableDataSource<CareerLevelLookupDto>(
          this.getCareerLevelOrdered(this.careerLevels)
        );
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error(error),
    };
    this.careerLevelClient.get().subscribe(observer);
  }

  getCareerLevelOrdered(
    careerList: CareerLevelLookupDto[],
    newList: CareerLevelLookupDto[] = [],
    index = 0
  ): CareerLevelLookupDto[] {
    // Quick and dirrty order
    const sequenz = this.careerLevelOrder;
    // Abort Condition
    const seqItem = sequenz[index];
    if (index >= sequenz.length) {
      // return carerLevel ordered newList with rest carerLevel
      return newList.concat(careerList);
    }

    for (let indexFor = 0; indexFor < careerList.length; indexFor++) {
      if (seqItem === careerList[indexFor].name) {
        newList = newList.concat(careerList.splice(indexFor, 1));
        return this.getCareerLevelOrdered(careerList, newList, index + 1);
      }
    }
    return this.getCareerLevelOrdered(careerList, newList, index + 1);
  }
}
