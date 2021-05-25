import {
  CareerLevelClient,
  CareerLevelDto,
  CreateCareerLevelCommand,
  UpdateCareerLevelCommand,
} from "./../../../membermanager-api";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "./create-career-level-dialog.component.html",
  styleUrls: ["./create-career-level-dialog.component.scss"],
})
export class CreateCareerLevelDialogComponent implements OnInit {
  createForm = this.fb.group({
    name: [null, Validators.required],
    shortName: [null, Validators.required],
  });

  description: string;
  careerLevel: CareerLevelDto;

  errors;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCareerLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; careerLevel: CareerLevelDto },
    private careerLevelClient: CareerLevelClient
  ) {
    this.description = data.description;
    this.careerLevel = data.careerLevel;
  }

  ngOnInit() {
    let name;
    let shortname;
    if (this.careerLevel) {
      name = this.careerLevel.name;
      shortname = this.careerLevel.shortName;
    }
    this.createForm = this.fb.group({
      name: [name, Validators.required],
      shortName: [shortname, Validators.required],
    });
  }

  get name() {
    return this.createForm.get("name").value;
  }

  get shortName() {
    return this.createForm.get("shortName").value;
  }

  save() {
    if (this.careerLevel) {
      this.edit(this.careerLevel.id);
    } else {
      this.create();
    }
  }

  create() {
    this.careerLevelClient
      .create(
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
      );
  }

  edit(id: number) {
    this.careerLevelClient
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
      );
  }

  handleError(error) {
    let errors = JSON.parse(error.response);

    // TODO make error component
    if (errors) {
      console.error(errors);
      this.errors = errors.title + ":";
    } else {
      console.error(error);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
