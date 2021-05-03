import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './dynamic-form-field/field-base';
import { FieldControlService } from './dynamic-form-field/field-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FieldControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() fields: FieldBase<string>[] = [];
  @Input() errors: any;

  form: FormGroup;
  payLoad = '';

  constructor(private qcs: FieldControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.fields);
  }

  ngOnChanges() {
    var key, keys = Object.keys(this.errors);
    var n = keys.length;
    var newobj = {}
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = this.errors[key];
    }
    this.errors = newobj;
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
