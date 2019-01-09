import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, DocumentSnapshot, QuerySnapshot} from "@angular/fire/firestore";
import {fromPromise} from "rxjs/internal-compatibility";
import {AuthService} from "../auth/auth.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {

  }

  /**
   * Save designed form to firebase
   * @param form form data as JSON
   * @param projectId project document id
   * @param presentId presentation document id
   */
  saveForm(form, projectId: string, presentId: string) {
    let a = new Subject<DocumentReference>()

    //Not need in current version
    if (projectId == undefined)
      fromPromise(this.fireStore.collection('form').add(JSON.parse(JSON.stringify(form)))).subscribe(
        next => a.next(next)
      )
    else {
      this.authService.user.subscribe(
        next => {
          //if user is not null
          if (next != null)
          // JASON.parse used to convert Typescript object to plain javascript object. If not firebase won't accept it
            fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).add(JSON.parse(JSON.stringify(form)))).subscribe(next => a.next(next))
        }
      )

    }

    return a as Observable<DocumentReference>
  }

  getLastId() {

  }

  updateLastId() {

  }

  /**
   * Get saved form from specified location
   * @param id Saved form document id
   * @param projectId original project id
   * @param presentId presentation id
   */
  getForm(id, projectId, presentId) {

    let a = new Subject<any>();

    this.authService.user.subscribe(next => {
        if (next != null)
          this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(id).get().subscribe(next => a.next(next))
      }
    )
    return a as Observable<DocumentSnapshot<any>>

  }

  /**
   * Get all form that in one presentation
   * @param projectId
   * @param presentId
   */
  getAllForm(projectId: string, presentId: string) {
    let a = new Subject<QuerySnapshot<any>>();
    this.authService.user.subscribe(next => {
        if (next != null)
          this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).get().subscribe(next =>
            a.next(next))
      }
    )

    return a as Observable<QuerySnapshot<any>>
  }

  /**
   * Update currently saved document
   * @param projectId
   * @param presentId
   * @param documentPath current form id
   * @param form update form
   */
  updateForm(projectId: string, presentId: string, documentPath: string, form) {
    let a = new Subject<any>();
    this.authService.user.subscribe(next => {
        if (next != null)
          fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(documentPath).update(JSON.parse(JSON.stringify(form)))).subscribe(next => a.next(next))
      }
    )

    return a as Observable<any>
  }

  /**
   * Delete specified form.
   * If form document id is provided it can be deleted immediately.Else if we have to provide some filter
   * @param projectId
   * @param presentId
   * @param documentPath
   * @param filter
   */
  deleteForm(projectId: string, presentId: string, documentPath?: string, filter?) {
    let a = new Subject<any>();
    this.authService.user.subscribe(next => {
        if (next != null) {
          if (documentPath != undefined) {
            fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(documentPath).delete()).subscribe(next => a.next(next))
          } else if (documentPath == undefined && filter != undefined) {
            fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).ref.where(filter.fieldPath, '==', filter.value).get()).subscribe(value => {
              value.docs.forEach(item =>
                fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(item.id).delete()).subscribe(
                  next => a.next(next)
                ))

            })
          }
        }

      }
    )

    return a as Observable<any>
  }

  formProvider() {

  }
}
