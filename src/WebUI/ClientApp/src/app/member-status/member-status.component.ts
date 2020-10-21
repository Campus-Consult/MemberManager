import { Component } from '@angular/core';
import { MemberStatusClient, MemberStatusVm } from '../membermanager-api';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  debug = false;

  memberStatusVm: MemberStatusVm;

  constructor(private memberStatusClient: MemberStatusClient) {
    memberStatusClient.get().subscribe(
      result => {
        this.memberStatusVm = result;
      },
      error => console.error(error)
    );
  }
}
