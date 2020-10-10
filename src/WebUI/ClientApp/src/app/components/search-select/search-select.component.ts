import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface AssignmentOption {
  name: string,
  id: number,
}

@Component({
  selector: 'app-search-select',
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
  public assignSuggestions: AssignmentOption[];
  @Input()
  public placeholder: string = "Bitte auswählen";
  public filteredSuggestions: AssignmentOption[];
  public nameToObjectMap: Map<string, AssignmentOption> = new Map();
  public searchFilter: string;
  public selectedOption: AssignmentOption;

  constructor() {}

  ngOnInit(): void {
    this.buildNameToObjMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignSuggestions'] !== undefined) {
      this.buildNameToObjMap();
      this.filteredSuggestions = this.filterAssignees(this.searchFilter);
    }
  }

  private buildNameToObjMap() {
    this.nameToObjectMap.clear();
    this.assignSuggestions.forEach(suggestion => {
      this.nameToObjectMap.set(suggestion.name, suggestion);
    })
  }

  private filterAssignees(value: string): AssignmentOption[] {
    if (value) {
      return this.assignSuggestions.filter(suggestion => suggestion.name.toLowerCase().includes(value));
    } else {
      return this.assignSuggestions;
    }
  }

  personChanged() {
    if (typeof this.searchFilter === 'string') {
      this.filteredSuggestions = this.filterAssignees(this.searchFilter);
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

  displayFn(suggestion?: AssignmentOption): string | undefined {
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
