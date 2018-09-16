import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {fromPromise} from "rxjs/internal-compatibility";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {

  }

  saveForm(form, projectId?: string, presentId?: string) {
    if (projectId == undefined)
      return fromPromise(this.fireStore.collection('form').add(JSON.parse(JSON.stringify(form))))
    else {
      this.authService.user.subscribe(
        next => {
          fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).add(JSON.parse(JSON.stringify(form))))
        }
      )

    }
  }

  getLastId() {

  }

  updateLastId() {

  }

  getForm(id) {

    return this.fireStore.collection('form').doc(id).get()

  }

  getAllForm()
  {
    return this.fireStore.collection('form').get()
  }
}
