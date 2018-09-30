import {TestBed} from '@angular/core/testing';

import {EvalFireStoreProviderService} from './eval-fire-store-provider.service';

describe('EvalFireStoreProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalFireStoreProviderService = TestBed.get(EvalFireStoreProviderService);
    expect(service).toBeTruthy();
  });
});
