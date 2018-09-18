import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from "@angular/fire/firestore";
import {fromPromise} from "rxjs/internal-compatibility";
import {AuthService} from "../auth/auth.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {

  }

  saveForm(form, projectId: string, presentId: string) {
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

  getForm(id, projectId, presentId) {

    let a = new Subject<any>();

    this.authService.user.subscribe(next =>

      this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(id).get().subscribe(next => a.next(next))
    )
    return a as Observable<DocumentSnapshot<any>>

  }

  getAllForm(projectId: string, presentId: string) {
    let a = new Subject<QuerySnapshot<any>>();
    this.authService.user.subscribe(next =>
      this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).get().subscribe(next =>
        a.next(next))
    )

    return a as Observable<QuerySnapshot<any>>
  }
}
