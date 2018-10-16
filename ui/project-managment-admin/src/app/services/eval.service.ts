import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EvalService {

  constructor(private fireStore: AngularFirestore) {
  }

  getEvalList() {
    return this.fireStore.collection('usersE').get()
  }
}
