import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPersonDetailVm } from "src/app/membermanager-api";
import { HistoryPanelsComponent } from "../history-panels/history-panels.component";

@Component({
  selector: "app-history-dialog",
  templateUrl: "./history-dialog.component.html",
  styleUrls: ["./history-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryDialogComponent implements OnInit {
  person: IPersonDetailVm;
  constructor(
    private dialogRef: MatDialogRef<HistoryPanelsComponent>,
    @Inject(MAT_DIALOG_DATA) data: { person: IPersonDetailVm }
  ) {
    this.person = data.person;
  }

  ngOnInit(): void {}

  close(){
    this.dialogRef.close();
  }
}
