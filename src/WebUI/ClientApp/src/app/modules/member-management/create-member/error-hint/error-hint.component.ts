import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-error-hint',
  templateUrl: './error-hint.component.html',
  styleUrls: ['./error-hint.component.scss'],
})
export class ErrorHintComponent implements OnChanges {
  @Input() invalidHints: string[];
  @Input() title: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.invalidHints) {
      console.warn('WARN: Input invalidHints undefined');
    }
  }
}
