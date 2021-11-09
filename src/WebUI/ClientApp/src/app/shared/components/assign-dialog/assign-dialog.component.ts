import { FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
} from '@angular/core';
import { SelectOption } from '../search-select/search-select.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignDialogComponent implements OnInit {
  @Input() description: string;
  @Input() assignForm: FormGroup;
  @Input() selectSuggestions: SelectOption[];
  @Input() errors?;

  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closeEvent.emit(undefined);
  }

  save() {
    this.saveEvent.emit(undefined);
  }
}
