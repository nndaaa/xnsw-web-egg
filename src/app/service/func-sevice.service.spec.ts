import { TestBed } from '@angular/core/testing';

import { FuncSeviceService } from './func-sevice.service';

describe('FuncSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuncSeviceService = TestBed.get(FuncSeviceService);
    expect(service).toBeTruthy();
  });
});
