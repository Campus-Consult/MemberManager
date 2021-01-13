import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  name: string,
  id: number,
}

@Component({
  selector: 'search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectComponent),
      multi: true
    }
  ]
})
export class SearchSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input()
  public selectSuggestions: SelectOption[];
  @Input()
  public placeholder: string = "Select one";
  @Input()
  public errorMsg: string = "Field is required!";

  public filteredSuggestions: SelectOption[];
  public nameToObjectMap: Map<string, SelectOption> = new Map();
  public searchFilter: string;
  public selectedOption: SelectOption;

  constructor() {}

  ngOnInit(): void {
    this.buildNameToObjMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectSuggestions'] !== undefined) {
      this.buildNameToObjMap();
      this.filteredSuggestions = this.filterSuggestions(this.searchFilter);
    }
  }

  private buildNameToObjMap() {
    this.nameToObjectMap.clear();
    this.selectSuggestions.forEach(suggestion => {
      this.nameToObjectMap.set(suggestion.name, suggestion);
    })
  }

  private filterSuggestions(value: string): SelectOption[] {
    if (value) {
      return this.selectSuggestions.filter(suggestion => suggestion.name.toLowerCase().includes(value));
    } else {
      return this.selectSuggestions;
    }
  }

  personChanged() {
    if (typeof this.searchFilter === 'string') {
      this.filteredSuggestions = this.filterSuggestions(this.searchFilter);
    } else {
      this.selectedOption = this.searchFilter;
      this.propagateChange(this.selectedOption);
    }
  }

  onBlur() {
    if (typeof this.searchFilter === 'string') {
      this.searchFilter = '';
      this.selectedOption = null;
      this.propagateChange(this.selectedOption);
    }
  }

  displayFn(suggestion?: SelectOption): string | undefined {
    return suggestion ? suggestion.name : undefined;
  }

  writeValue(obj: any): void {
    this.searchFilter = obj.name;
  }
  propagateChange = (_: any) => {}
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  public get showError(): boolean {
    return !this.selectedOption;
  }
}
