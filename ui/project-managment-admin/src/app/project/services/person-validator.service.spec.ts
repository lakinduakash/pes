import {TestBed} from '@angular/core/testing';

import {PersonValidatorService} from './person-validator.service';

describe('PersonValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonValidatorService = TestBed.get(PersonValidatorService);
    expect(service).toBeTruthy();
  });
});
