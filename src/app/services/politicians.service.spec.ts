import { TestBed } from '@angular/core/testing';

import { PoliticiansService } from './politicians.service';

describe('PoliticiansService', () => {
  let service: PoliticiansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticiansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
