import {TestBed} from '@angular/core/testing';

import {StudentTableService} from './student-table.service';

describe('StudentTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentTableService = TestBed.get(StudentTableService);
    expect(service).toBeTruthy();
  });
});
