import {TestBed} from '@angular/core/testing';

import {EvalAssignService} from './eval-assign.service';

describe('EvalAssignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalAssignService = TestBed.get(EvalAssignService);
    expect(service).toBeTruthy();
  });
});
