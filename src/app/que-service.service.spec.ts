import { TestBed } from '@angular/core/testing';

import { QueServiceService } from './que-service.service';

describe('QueServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueServiceService = TestBed.get(QueServiceService);
    expect(service).toBeTruthy();
  });
});
