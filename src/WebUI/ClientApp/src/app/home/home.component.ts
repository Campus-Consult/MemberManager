import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { FieldBase } from '../shared/components/dynamic-form/dynamic-form-field/field-base';
import { DropdownField } from '../shared/components/dynamic-form/dynamic-form-field/field-dropdown';
import { TextboxField } from '../shared/components/dynamic-form/dynamic-form-field/field-textbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;

  public fields$: Observable<FieldBase<string>[]>;
  public errors$: Observable<any>;

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));

    const errors = {
      "Brave": ["Error1", "Error2"]
    }
    this.errors$ = of(errors);

    const fields: FieldBase<string>[] = [
      new DropdownField({
        key: "brave",
        label: "Bravery Rating",
        options: [
          { key: "solid", value: "Solid" },
          { key: "great", value: "Great" },
          { key: "good", value: "Good" },
          { key: "unproven", value: "Unproven" }
        ],
        order: 3
      }),

      new TextboxField({
        key: "firstName",
        label: "First name",
        value: "Bombasto",
        required: true,
        order: 1,
        hint: "abc"
      }),

      new TextboxField({
        key: "emailAddress",
        label: "Email",
        type: "email",
        order: 2,
        placeholder: "example@campus-consult.org"
      }),

      new TextboxField({
        key: "emailAddress",
        label: "PLZ",
        order: 4
      })
    ];
    this.fields$ = of(fields.sort((a, b) => a.order - b.order))

  }
}
