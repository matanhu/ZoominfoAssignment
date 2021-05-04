import { TestBed } from '@angular/core/testing';

import { OpentdbService } from './opentdb.service';

describe('OpentdbService', () => {
  let service: OpentdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpentdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
