import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent {
  @Input() field: FieldBase<string>;
  @Input() errors: Array<string>;

  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }
}
