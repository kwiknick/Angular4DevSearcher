import { TestBed, inject } from '@angular/core/testing';

import { SalesLeadsService } from './sales-leads.service';

describe('SalesLeadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesLeadsService]
    });
  });

  it('should be created', inject([SalesLeadsService], (service: SalesLeadsService) => {
    expect(service).toBeTruthy();
  }));
});
