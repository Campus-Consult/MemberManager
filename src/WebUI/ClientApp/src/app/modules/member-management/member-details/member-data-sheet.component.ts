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
  PersonPositionVm,
  PersonMemberStatusVm,
  PersonCareerLevelVm,
  PositionClient,
  DismissFromPositionCommand,
  CareerLevelClient,
  ChangePersonCareerLevelCommand,
  MemberStatusClient,
  UpdateMemberStatusCommand,
  ChangePersonMemberStatusCommand,
  AssignToPositionCommand,
} from 'src/app/membermanager-api';
import { MatDialog } from '@angular/material/dialog';
import { HistoryData } from '../member-history/member-history.component';
import { MemberDismissDialogComponent } from '../member-dismiss-dialog/member-dismiss-dialog.component';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  MemberAssignDialogComponent,
  MemberAssignDialogData,
} from '../member-assign-dialog/member-assign-dialog.component';
import { SelectOption } from 'src/app/shared/components/search-select/search-select.component';

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

  @Output()
  reloadEvent = new EventEmitter<void>();

  public personDetails: IPersonDetailVm;

  public displayedName: string;

  careerLevelHistory: HistoryData[] = [];
  positionHistory: HistoryData[] = [];
  memberStatusHistory: HistoryData[] = [];
  careerLevelSuggestions: SelectOption[] = [];
  memberStatusSuggestions: SelectOption[] = [];
  positionSuggestions: SelectOption[] = [];

  /**
   * if set text will be displayed, below loading
   */
  showLoadingText?: string;

  constructor(
    private personApi: PeopleClient,
    private careerLevelApi: CareerLevelClient,
    private memberStatusApi: MemberStatusClient,
    protected dialog: MatDialog,
    private positionService: PositionClient
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
      this.careerLevelHistory = this.getCareerLevelHistory();
      this.positionHistory = this.getPositionHistory();
      this.memberStatusHistory = this.getMemberStatusHistory();
      this.showLoadingText = undefined;
    });
  }

  doReload() {
    this.loadPersondata();
    this.reloadEvent.emit();
  }

  getFullName(): string {
    let fullname = '';
    if (this.person.firstName) {
      fullname = fullname + this.person.firstName;
    }
    if (this.person.surname) {
      fullname = fullname + ' ' + this.person.surname;
    }
    return fullname;
  }

  handlePositionDismiss = (element: HistoryData) => {
    this.dialog.open(MemberDismissDialogComponent, {
      role: 'alertdialog',
      width: '250px',
      data: {
        description: `${this.getFullName()} von Posten ${
          element.name
        } entfernen?`,
        dismissCallback: (dismissalDate: string): Observable<any> => {
          return this.positionService
            .dismiss(
              element.connectedId,
              new DismissFromPositionCommand({
                dismissalDateTime: dismissalDate,
                personId: this.person.id,
                positionId: element.connectedId,
              })
            )
            .pipe(
              tap(() => {
                this.doReload();
              })
            );
        },
      },
    });
  };

  handleCareerReassign = async (element: HistoryData): Promise<void> => {
    const dialogData: MemberAssignDialogData = {
      description: `${this.getFullName()} von Karrierestufe ${
        element.name
      } entfernen?`,
      assignSelectSuggestions: await this.getCareerLevelSuggestions(),
      assignLabel: 'Karrierestufe',
      assignAction: 'Neu Zuweisen',
      assignCallback: (reassignDate, newAssignedId) => {
        return this.careerLevelApi
          .changePersonCareerLevel(
            new ChangePersonCareerLevelCommand({
              personId: this.person.id,
              careerLevelId: newAssignedId,
              changeDateTime: reassignDate,
            })
          )
          .pipe(
            tap(() => {
              this.doReload();
            }),
            // it returns a number, we're not interested in that
            map((v) => undefined)
          );
      },
    };
    this.dialog.open(MemberAssignDialogComponent, {
      role: 'alertdialog',
      width: '250px',
      data: dialogData,
    });
  };

  handleMemberStatusReassign = async (element: HistoryData): Promise<void> => {
    const dialogData: MemberAssignDialogData = {
      description: `${this.getFullName()} vom Status ${
        element.name
      } entfernen?`,
      assignSelectSuggestions: await this.getMemberStatusSuggestions(),
      assignLabel: 'Status',
      assignAction: 'Neu Zuweisen',
      assignCallback: (reassignDate, newAssignedId) => {
        return this.memberStatusApi
          .changePersonMemberStatus(
            new ChangePersonMemberStatusCommand({
              personId: this.person.id,
              memberStatusId: newAssignedId,
              changeDateTime: reassignDate,
            })
          )
          .pipe(
            tap(() => {
              this.doReload();
            }),
            // it returns a number, we're not interested in that
            map((v) => undefined)
          );
      },
    };
    this.dialog.open(MemberAssignDialogComponent, {
      role: 'alertdialog',
      width: '250px',
      data: dialogData,
    });
  };

  handlePositionAssign = async (): Promise<void> => {
    const dialogData: MemberAssignDialogData = {
      description: `Neuer Posten für ${this.getFullName()}`,
      assignSelectSuggestions: await this.getPositionSuggestions(),
      assignLabel: 'Posten',
      assignAction: 'Neu Zuweisen',
      assignCallback: (assignDate, newAssignedId) => {
        return this.positionService
          .assign(
            newAssignedId,
            new AssignToPositionCommand({
              personId: this.person.id,
              positionId: newAssignedId,
              assignmentDateTime: assignDate,
            })
          )
          .pipe(
            tap(() => {
              this.doReload();
            }),
            // it returns a number, we're not interested in that
            map((v) => undefined)
          );
      },
    };
    this.dialog.open(MemberAssignDialogComponent, {
      role: 'alertdialog',
      width: '250px',
      data: dialogData,
    });
  };

  getCareerLevelHistory(): HistoryData[] {
    return this.personDetails.careerLevels.map((careerLevel) => ({
      id: careerLevel.id,
      connectedId: careerLevel.careerLevelId,
      name: `${careerLevel.careerLevelName} (${careerLevel.careerLevelShortName})`,
      startDate: careerLevel.beginDateTime,
      endDate: careerLevel.endDateTime,
    }));
  }

  getPositionHistory(): HistoryData[] {
    return this.personDetails.positions.map((position) => ({
      id: position.id,
      connectedId: position.positionId,
      name: `${position.positionName} (${position.positionShortName})`,
      startDate: position.beginDateTime,
      endDate: position.endDateTime,
    }));
  }

  getMemberStatusHistory(): HistoryData[] {
    return this.personDetails.memberStatus.map((memberStatus) => ({
      id: memberStatus.id,
      connectedId: memberStatus.memberStatusId,
      name: memberStatus.memberStatusName,
      startDate: memberStatus.beginDateTime,
      endDate: memberStatus.endDateTime,
    }));
  }

  async getCareerLevelSuggestions(): Promise<SelectOption[]> {
    if (this.careerLevelSuggestions.length === 0) {
      // TODO: implement business logic in backend!
      const suggestions = await this.careerLevelApi.get().toPromise();
      this.careerLevelSuggestions = suggestions.careerLevels.map((s) => {
        return { name: s.name, id: s.id };
      });
    }
    return this.careerLevelSuggestions;
  }

  async getMemberStatusSuggestions(): Promise<SelectOption[]> {
    if (this.memberStatusSuggestions.length === 0) {
      // TODO: implement business logic in backend!
      const suggestions = await this.memberStatusApi.get().toPromise();
      this.memberStatusSuggestions = suggestions.memberStatus.map((s) => {
        return { name: s.name, id: s.id };
      });
    }
    return this.memberStatusSuggestions;
  }

  async getPositionSuggestions(): Promise<SelectOption[]> {
    if (this.positionSuggestions.length === 0) {
      const suggestions = await this.positionService.get().toPromise();
      this.positionSuggestions = suggestions.positions.map((s) => {
        return { name: s.name, id: s.id };
      });
    }
    return this.positionSuggestions;
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
