import { TestBed } from '@angular/core/testing';

import { QuirofanosService } from './quirofanos.service';

describe('QuirofanosService', () => {
  let service: QuirofanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuirofanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
