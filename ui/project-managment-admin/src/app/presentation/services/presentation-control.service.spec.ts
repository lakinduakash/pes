import {TestBed} from '@angular/core/testing';

import {PresentationControlService} from './presentation-control.service';

describe('PresentationControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentationControlService = TestBed.get(PresentationControlService);
    expect(service).toBeTruthy();
  });
});
