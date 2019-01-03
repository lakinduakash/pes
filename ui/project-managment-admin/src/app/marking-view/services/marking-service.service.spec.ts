import {TestBed} from '@angular/core/testing';

import {MarkingService} from './marking-service.service';

describe('MarkingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkingService = TestBed.get(MarkingService);
    expect(service).toBeTruthy();
  });
});
