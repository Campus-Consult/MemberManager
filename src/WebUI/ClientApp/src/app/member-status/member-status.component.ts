import { Component } from '@angular/core';
import { MemberStatusClient } from '../membermanager-api';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  debug: boolean = false;

  constructor() { }

  ngOnInit() { }
}
