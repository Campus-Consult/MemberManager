import { MemberStatusDetailVm, MemberStatusClient, CreateCareerLevelCommand, UpdateCareerLevelCommand } from './../../../../membermanager-api';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-status-create-dialog',
  templateUrl: './member-status-create-dialog.component.html',
  styleUrls: ['./member-status-create-dialog.component.scss']
})
export class MemberStatusCreateDialogComponent implements OnInit {

  createForm = this.fb.group({
    name: [null, Validators.required],
    shortName: [null, Validators.required],
  });

  description: string;
  memberStatus: MemberStatusDetailVm;
  errors: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberStatusCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; memberStatus: MemberStatusDetailVm },
    private memberStatusClient: MemberStatusClient
  ) {
    this.description = data.description;
    // optional Parameter, for edit
    this.memberStatus = data.memberStatus;
  }

  ngOnInit() {
    let name;
    if (this.memberStatus) {
      name = this.memberStatus.name;
    }
    this.createForm = this.fb.group({
      name: [name, Validators.required],
    });
  }

  get name() {
    return this.createForm.get("name").value;
  }

  get shortName() {
    return this.createForm.get("shortName").value;
  }

  save() {
    if (this.memberStatus) {
      this.edit(this.memberStatus.id);
    } else {
      this.create();
    }
  }

  create() {
    // TODO: Waiting for backend
/*     this.memberStatusClient
      .(
        new CreateCareerLevelCommand({
          name: this.name,
          shortName: this.shortName,
        })
      )
      .subscribe(
        (val) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.handleError(error);
        }
      ); */
  }

  edit(id: number) {
    // TODO:
/*     this.memberStatusClient
      .update(
        id,
        new UpdateCareerLevelCommand({
          careerLevelId: id,
          name: this.name,
          shortName: this.shortName,
        })
      )
      .subscribe(
        (val) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.handleError(error);
        }
      ); */
  }

  handleError(error) {
    console.error(error);
    this.errors = error;
  }

  close() {
    this.dialogRef.close();
  }

}
