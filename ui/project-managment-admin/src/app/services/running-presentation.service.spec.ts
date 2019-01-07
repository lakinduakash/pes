import {TestBed} from '@angular/core/testing';

import {RunningPresentationService} from './running-presentation.service';

describe('RunningPresentationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunningPresentationService = TestBed.get(RunningPresentationService);
    expect(service).toBeTruthy();
  });
});
