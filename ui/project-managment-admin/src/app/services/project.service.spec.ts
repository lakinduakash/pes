import {inject, TestBed} from '@angular/core/testing';

import {AddProjectService} from './project.service';

describe('AddProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProjectService]
    });
  });

  it('should be created', inject([AddProjectService], (service: AddProjectService) => {
    expect(service).toBeTruthy();
  }));
});
