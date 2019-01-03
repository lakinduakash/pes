import { TestBed } from '@angular/core/testing';

import { ViewmarksService } from './viewmarks.service';

describe('ViewmarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewmarksService = TestBed.get(ViewmarksService);
    expect(service).toBeTruthy();
  });
});
