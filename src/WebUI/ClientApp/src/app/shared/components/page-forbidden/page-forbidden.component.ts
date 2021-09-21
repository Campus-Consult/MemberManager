import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './page-forbidden.component.html'
})
export class PageForbiddenComponent implements OnInit {

  routeString: string;

  constructor(private route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>this.routeString = params['route'])
  }

}
