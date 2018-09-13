import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {from, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fireStore: AngularFirestore) {
  }

  saveForm(form) {

    return fromPromise(this.fireStore.collection('form').add(JSON.parse(JSON.stringify(form))))
  }

  getLastId() {

  }

  updateLastId() {

  }

  getForm(id) {

    return this.fireStore.collection('form').doc("zQ5ZKIx7pGR5deB3lKOP").get()

  }

  getAllForm()
  {

  }
}
