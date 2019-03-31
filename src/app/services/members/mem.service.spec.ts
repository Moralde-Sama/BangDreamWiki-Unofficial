import { TestBed } from '@angular/core/testing';

import { MemService } from './mem.service';

describe('MemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemService = TestBed.get(MemService);
    expect(service).toBeTruthy();
  });
});
