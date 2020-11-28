import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MemberStatusClient, MemberStatusDetailVm } from '../../../../membermanager-api';

@Component({
  selector: 'app-member-status-details',
  templateUrl: './member-status-details.component.html',
  styleUrls: ['./member-status-details.component.scss']
})
export class MemberStatusDetailsComponent implements OnInit, OnChanges {

  @Input() memberStatusID: number;

  memberStatus: MemberStatusDetailVm;

  constructor(private memberStatusClient: MemberStatusClient) { }

  ngOnInit(): void {
    this.memberStatusClient.get2(this.memberStatusID).subscribe(result => {
      this.memberStatus = result;
    });
  }

  ngOnChanges(): void {
    this.memberStatusClient.get2(this.memberStatusID).subscribe(result => {
      this.memberStatus = result;
    });
  }
}
