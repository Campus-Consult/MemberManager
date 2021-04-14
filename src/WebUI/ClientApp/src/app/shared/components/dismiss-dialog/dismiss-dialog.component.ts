import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../search-select/search-select.component';

@Component({
  selector: 'app-dismiss-dialog',
  templateUrl: './dismiss-dialog.component.html',
  styleUrls: ['./dismiss-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DismissDialogComponent implements OnInit {


  @Input() description: string;
  @Input() selectSuggestions: SelectOption[];
  @Input() reassignSelectSuggestions: SelectOption[];
  @Input() errors?;

  @Output() closeEvent = new EventEmitter()
  @Output() saveEvent = new EventEmitter<DismissSave>()
  @Output() reassignEvent= new EventEmitter<any>()


  dismissForm: FormGroup;

  get dismissedElement() {
    return this.dismissForm.get('dismissedPerson').value;
  }

  get dismissalDate() {
    return this.dismissForm.get('dismissalDate').value;
  }

  get reassignedElement() {
    return this.dismissForm.get('reassignedElement').value;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dismissForm = this.fb.group({
      dismissedPerson: [true, Validators.required],
      dismissalDate: [null, Validators.required],
      reassignedElement: [true, Validators.required],
    });
  }

  close(){
    this.closeEvent.emit(undefined);
  }

  save(){
    this.saveEvent.emit({dismissedElement: this.dismissedElement, dismissalDate: this.dismissalDate});
  }

  reassign(){
    this.reassignEvent.emit(this.reassignedElement);
  }

}

export interface DismissSave{
  dismissedElement: any;
  dismissalDate: any;
}
