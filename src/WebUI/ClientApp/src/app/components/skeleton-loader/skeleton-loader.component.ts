import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit, OnChanges {

  @Input()
  type:SkeletonTypes;

  @Input()
  value: any;

  constructor() { }

  ngOnInit(): void {
    switch (this.type) {
      case SkeletonTypes.CIRCLE:  
        break;
      case SkeletonTypes.LINE:
        break;
      default:
        console.warn('Warning Input Skeleton Type: " '+this.type + '" is not supported!');
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (key === 'value') {
        this.value = changes[key].currentValue;
        
      }
    }
  }

}

export enum SkeletonTypes {
  LINE= 'line',
  CIRCLE= 'circle',

}
