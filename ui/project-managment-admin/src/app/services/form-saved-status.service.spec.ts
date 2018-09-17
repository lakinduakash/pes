import { TestBed } from '@angular/core/testing';

import { FormSavedStatusService } from './form-saved-status.service';

describe('FormSavedStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormSavedStatusService = TestBed.get(FormSavedStatusService);
    expect(service).toBeTruthy();
  });
});
