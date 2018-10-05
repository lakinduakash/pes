import {TestBed} from '@angular/core/testing';

import {CanDeactivateGuard} from './can-deactivate-guard.service';

fdescribe('CanDeactivateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CanDeactivateGuard]
  }));

  fit('should be created', () => {
    const service: CanDeactivateGuard = TestBed.get(CanDeactivateGuard);
    expect(service).toBeTruthy();
  });
});
