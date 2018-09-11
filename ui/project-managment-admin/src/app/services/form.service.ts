import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fireStore: AngularFirestore) {
  }

  saveForm(form) {
    this.fireStore.collection('form').add(form)
  }

  getLastId() {

  }

  updateLastId() {

  }

  getForm(id) {

  }
}
