import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DismissSave } from "src/app/shared/components/dismiss-dialog/dismiss-dialog.component";
import { SelectOption } from "src/app/shared/components/search-select/search-select.component";
import {
  CareerLevelAssignee,
  CareerLevelClient,
  CareerLevelDto,
  ChangePersonCareerLevelCommand,
} from "./../../../membermanager-api";

@Component({
  selector: "app-career-level-dismiss-dialog",
  templateUrl: "./career-level-dismiss-dialog.component.html",
  styleUrls: ["./career-level-dismiss-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerLevelDismissDialogComponent implements OnInit {
  description: string;

  suggestions: SelectOption[];

  reassignSuggestions: SelectOption[];

  careerLevel: CareerLevelDto;

  errors;

  constructor(
    private dialogRef: MatDialogRef<CareerLevelDismissDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { description: string; careerLevel: CareerLevelDto ,assignees: CareerLevelAssignee[]},
    private careerLevelClient: CareerLevelClient
  ) {
    this.description = data.description;
    this.careerLevel = data.careerLevel;
  }

  ngOnInit() {
    // this.fetchSuggestions();
    this.suggestions = this.careerLevel.assignees.map((s) => {
      return { name: s.firstName + s.surname, id: s.id };
    });
    this.fetchReassignSuggestions();
  }

  save(dismissEvent: DismissSave) {
    this.careerLevelClient
      .changePersonCareerLevel(
        this.careerLevel.id,
        new ChangePersonCareerLevelCommand({
          changeDateTime: dismissEvent.dismissalDate,
          careerLevelId: dismissEvent.reassignElement.id,
          personId: dismissEvent.dismissedElement.id,
        })
      )
      .subscribe(
        (val) => {
          this.dialogRef.close(true);
        },
        (error) => {
          let errors = JSON.parse(error.response);

          // TODO: make error component
          if (errors) {
            console.error(errors);
            this.errors = errors.title + ":";

            for (var i = 0; i < errors.errors.PersonId.length; i++) {
              this.errors += errors.errors.PersonId[i];
            }
          } else {
            console.error(error);
          }
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

/*   fetchSuggestions() {
    this.careerLevelClient.getAssignSuggestions(this.careerLevel.id).subscribe(
      (suggestions) => {
        console.log(suggestions);
          this.suggestions = suggestions.suggestions.map((s) => {
          return { name: s.name, id: s.id };
        });
      },
      (error) => console.error(error)
    );
  } */

  fetchReassignSuggestions() {
    // TODO: implement business logic in backend!
    this.careerLevelClient.get().subscribe(
      (suggestions) => {
        this.reassignSuggestions = suggestions.careerLevels
          .map((s) => {
            return { name: s.name, id: s.id };
          })
      },
      (error) => console.error(error)
    );
  }
}
