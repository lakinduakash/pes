import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EvalService {

  constructor(private fireStore: AngularFirestore) {
  }

  /**
   * Get list of evaluators from pes firestore
   */
  getEvalList() {
    return this.fireStore.collection('usersE').get()
  }
}
