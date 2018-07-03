import {inject, TestBed} from '@angular/core/testing';

import {RenameTitleBarService} from './rename-title-bar.service';

describe('RenameTitleBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenameTitleBarService]
    });
  });

  it('should be created', inject([RenameTitleBarService], (service: RenameTitleBarService) => {
    expect(service).toBeTruthy();
  }));
});
