import { TestBed } from '@angular/core/testing';

import { CliqProceduresService } from './cliq-procedures.service';

describe('CliqProceduresService', () => {
  let service: CliqProceduresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CliqProceduresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
