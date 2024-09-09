import { TestBed } from '@angular/core/testing';

import { ProceduresTypeService } from './procedures-type.service';

describe('ProceduresTypeService', () => {
  let service: ProceduresTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProceduresTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
