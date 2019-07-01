import { TestBed } from '@angular/core/testing';

import { DataSeviceService } from './data-sevice.service';

describe('DataSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSeviceService = TestBed.get(DataSeviceService);
    expect(service).toBeTruthy();
  });
});
