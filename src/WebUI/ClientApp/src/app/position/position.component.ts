import { Component, OnInit, Inject } from '@angular/core';
import { PositionApiService, Position, PositionEdit, PositionHolder } from '../services/positionapi.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PositionAssignDialogComponent } from './position-assign-dialog/position-assign-dialog.component';
import { PositionDismissDialogComponent } from "./position-dismiss-dialog/position-dismiss-dialog.component";
import { PositionEditDialogComponent } from "./position-edit-dialog/position-edit-dialog.component";
import { PositionClient, PositionsVm, PositionLookupDto, PositionDto } from '../membermanager-api';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  allPositions: PositionDto[];

  filteredPositions: PositionDto[];
  searchTerm: string;
  activeFilter: 'all' | 'active' | 'deprecated';

  loading = true;

  constructor(private positionClient: PositionClient, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.activeFilter = 'all';
    this.searchTerm = '';
    this.positionClient.getWithAssignees(false).subscribe(pos => {
      this.allPositions = pos.positions;
      this.loading = false;
      this.updateFiltering();
    });
  }

  public updateFiltering(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredPositions = this.allPositions.filter(p => {
      if (p.isActive && this.activeFilter === 'deprecated') { return false; }
      if (!p.isActive && this.activeFilter === 'active') { return false; }
      return p.name.toLowerCase().includes(searchTerm) || p.shortName.toLowerCase().includes(searchTerm);
    });
  }

  public edit(position: Position): void {
    const posEdit: PositionEdit = {
      name: position.name,
      shortName: position.shortName,
      positionID: position.positionID,
    };
    const dialogRef = this.dialog.open(PositionEditDialogComponent, {
      width: '400px',
      data: posEdit,
    });

    dialogRef.afterClosed().subscribe((result: undefined | PositionEdit) => {
      if (!!result) {
        const changedPosition = this.allPositions.find(pos => pos.id === result.positionID);
        if (!changedPosition) {
          console.log('Error, changed non existsing position??');
        } else {
          changedPosition.name = result.name;
          changedPosition.shortName = result.shortName;
        }
      }
    });
  }

  public assign(position: Position): void {
    this.dialog.open(PositionAssignDialogComponent, {
      data: position,
    });
  }

  public dismiss(position: Position, person: PositionHolder): void {
    this.dialog.open(PositionDismissDialogComponent, {
      data: {
        position,
        person,
      },
    });
  }
}