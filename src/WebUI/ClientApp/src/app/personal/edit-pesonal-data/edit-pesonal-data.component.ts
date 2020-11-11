import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeopleClient, PersonDetailVm } from 'src/app/membermanager-api';
import { CreatePersonComponent } from '../create-person/create-person.component';

/**
 * Edit People Modal
 * @extends CreatePersonComponent
 */
@Component({
  selector: 'app-edit-pesonal-data',
  templateUrl: './edit-pesonal-data.component.html',
  styleUrls: ['./edit-pesonal-data.component.scss'],
})
export class EditPersonalDataComponent extends CreatePersonComponent implements OnInit, AfterViewInit {

  memberdata: PersonDetailVm;

  constructor(public dialogRef: MatDialogRef<CreatePersonComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.memberdata = this.data;
  }

}
