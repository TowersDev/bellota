import { TestBed } from '@angular/core/testing';

import { BellotasService } from './bellotas.service';

describe('BellotasService', () => {
  let service: BellotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BellotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
