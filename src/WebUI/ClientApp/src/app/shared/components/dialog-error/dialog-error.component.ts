import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogErrorComponent implements OnInit, OnChanges {
  @Input() errors;

  errorMsg;
  errorMsgList: string[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.errors && Object.keys(this.errors).length > 0) {
      this.handleError(this.errors);
    }
  }

  handleError(error) {
    let parsedErrorObject: any;
    // Intercept Normal Error
    if (error && error.response) {
      parsedErrorObject = JSON.parse(error.response);
    }

    if (parsedErrorObject) {
      this.errorMsg = parsedErrorObject?.title + ':';
      if (parsedErrorObject.errors) {
        this.errorMsgList = [];
        for (const key in parsedErrorObject.errors) {
          if (
            Object.prototype.hasOwnProperty.call(parsedErrorObject.errors, key)
          ) {
            this.errorMsgList.push(key + ': ' + parsedErrorObject.errors[key]);
          }
        }
      }
    } else {
      console.error(error);
    }
  }
}
