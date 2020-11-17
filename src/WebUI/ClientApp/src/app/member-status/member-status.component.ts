import { Component } from '@angular/core';
import { MemberStatusClient, MemberStatusVm } from '../membermanager-api';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.scss']
})
export class MemberStatusComponent {

  debug: boolean = false;

  memberStatusVm: MemberStatusVm;

  selectedMemberStatusID: number;

  constructor(private memberStatusClient: MemberStatusClient) { }

  ngOnInit() {
    this.memberStatusClient.get().subscribe(
      result => {
        this.memberStatusVm = result;
      },
      error => console.error(error)
    );
  }
}
