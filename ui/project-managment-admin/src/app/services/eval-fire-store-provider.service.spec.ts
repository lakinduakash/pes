import {TestBed} from '@angular/core/testing';

import {EvalFireStoreFactory, EvalFireStoreProviderService} from './eval-fire-store-provider.service';
import {NgZone, PLATFORM_ID} from "@angular/core";
import {from} from "rxjs";

fdescribe('EvalFireStoreProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: EvalFireStoreProviderService,
        deps: [PLATFORM_ID, NgZone],
        useFactory: EvalFireStoreFactory
      }]
    })
  });

  fit('should be created', () => {
    let service: EvalFireStoreProviderService = TestBed.get(EvalFireStoreProviderService);
    expect(service).toBeTruthy();
  });

  fit('write a value and get the value ', (done) => {

    let service: EvalFireStoreProviderService = TestBed.get(EvalFireStoreProviderService);
    from(service.collection('f').add({a: 4})).subscribe(next => {
      from(service.collection('f').ref.where('a', '==', 4).get()).subscribe(value => {
          let c = value.docs.length

          service.collection('f').ref.doc().delete()

          expect(c).toBeGreaterThanOrEqual(1)
          done();

        },
        error1 => console.log(error1))

    })


  })
});
