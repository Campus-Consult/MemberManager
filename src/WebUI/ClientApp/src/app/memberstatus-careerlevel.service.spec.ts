import { TestBed } from '@angular/core/testing';

import { MemberstatusCareerlevelService } from './memberstatus-careerlevel.service';

describe('MemberstatusCareerlevelService', () => {
  let service: MemberstatusCareerlevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberstatusCareerlevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
