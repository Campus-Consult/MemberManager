import { DeleteDialogComponent } from './../../../shared/components/delete-dialog/delete-dialog.component';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IPersonWithBasicInfoLookupDto,
  IPersonDetailVm,
  PeopleClient,
} from 'src/app/membermanager-api';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-details',
  templateUrl: './member-data-sheet.component.html',
  styleUrls: ['./member-data-sheet.component.scss'],
})
export class MemberDataSheetComponent implements OnInit, OnChanges {
  @Input()
  person: IPersonWithBasicInfoLookupDto;

  @Output()
  editEvent = new EventEmitter<IPersonDetailVm>();

  @Output()
  deleteEvent = new EventEmitter<void>();

  public personDetails: IPersonDetailVm;

  public displayedName: string;

  /**
   * if set text will be displayed, below loading
   */
  showLoadingText?: string;

  constructor(
    private personApi: PeopleClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.displayedName = 'No Person Selected';
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'personId') {
        const chng = changes[propName];
        this.person = chng.currentValue;
      }
    }

    // Load person Details
    if (this.person) {
      this.loadPersondata();
      this.displayedName = this.getFullName();
    }
  }

  loadPersondata() {
    this.showLoadingText = 'Laden Mitglieder Details';
    this.personApi.get2(Number(this.person.id)).subscribe((person) => {
      this.personDetails = person;
      this.showLoadingText = undefined;
    });
  }

  getFullName(): string {
    let fullname = '';
    if (this.person.firstName) {
      fullname = fullname + this.person.firstName;
    }
    if (this.person.firstName) {
      fullname = fullname + ' ' + this.person.surname;
    }
    return fullname;
  }

  onEdit() {
    this.editEvent.emit(this.personDetails);
  }

  private onDelete() {
    this.personApi.delete(this.personDetails.id).subscribe(() => {
      this.deleteEvent.emit();
      this.showLoadingText = undefined;
    });
    this.personDetails = undefined;
    this.showLoadingText = 'Lösche Nutzer';
  }

  openDeleteDialog() {
    const memberName = `${this.personDetails.firstName} ${this.personDetails.surname}`;
    const content = `Willst du Mitglied ${memberName} unwiederuflich löschen?`;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      role: 'alertdialog',
      data: { title: `${memberName} löschen?`, content: content },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete();
      }
    });
  }
}
