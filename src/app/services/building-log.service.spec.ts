import { TestBed } from '@angular/core/testing';

import { BuildingLogService } from './building-log.service';

describe('BuildingLogService', () => {
  let service: BuildingLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
