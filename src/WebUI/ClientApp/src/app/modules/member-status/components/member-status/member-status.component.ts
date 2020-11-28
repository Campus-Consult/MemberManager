import { Component } from '@angular/core';
import { MemberStatusLookupDto } from '../../../../membermanager-api';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  debug: boolean = false;

  selectedMemberStatus: MemberStatusLookupDto;

  constructor() { }

  ngOnInit() { }

  onListSelection(selectedMemberStatus: MemberStatusLookupDto) {
    this.selectedMemberStatus = selectedMemberStatus;
  }
}
