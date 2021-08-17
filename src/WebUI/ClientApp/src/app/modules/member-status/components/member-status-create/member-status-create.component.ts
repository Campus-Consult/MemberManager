import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface MemberStatusCreateData {name: string}

@Component({
  selector: "app-member-status-create",
  templateUrl: "./member-status-create.component.html",
  styleUrls: ["./member-status-create.component.scss"],
})
export class MemberStatusCreateComponent implements OnInit {

  fromData: MemberStatusCreateData;

  constructor(public dialogRef: MatDialogRef<MemberStatusCreateComponent>) {
    this.fromData = {name:''};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
