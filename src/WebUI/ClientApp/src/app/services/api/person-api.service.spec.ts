import { TestBed } from '@angular/core/testing';

import { PersonApiService } from './person-api.service';

describe('PersonApiService', () => {
  let service: PersonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
