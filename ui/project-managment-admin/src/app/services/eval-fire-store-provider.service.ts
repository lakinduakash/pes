import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {environment} from "../../environments/environment";

@Injectable()
export class EvalFireStoreProviderService extends AngularFirestore {
}

/**
 * This function provide access to pes-eval firestore (2nd firebase access)
 * @param platformId
 * @param zone
 * @constructor
 */
export function EvalFireStoreFactory(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.evalStoreConfig, 'evalStore', false, null, platformId, zone, null);
}
