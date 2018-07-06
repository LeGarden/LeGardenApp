import { TestBed, inject } from '@angular/core/testing';

import { LogAnalyticService } from './loganalytic.service';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogAnalyticService]
    });
  });

  it('should be created', inject([LogAnalyticService], (service: LogAnalyticService) => {
    expect(service).toBeTruthy();
  }));
});
