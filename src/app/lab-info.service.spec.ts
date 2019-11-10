import { TestBed } from '@angular/core/testing';

import { LabInfoService } from './lab-info.service';

describe('LabInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabInfoService = TestBed.get(LabInfoService);
    expect(service).toBeTruthy();
  });
});
