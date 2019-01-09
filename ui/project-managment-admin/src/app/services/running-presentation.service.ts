import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class RunningPresentationService {

  constructor(public auth: AuthService, public firestore: AngularFirestore) {
  }


  /**
   * Get project specific presentation state from user document of running project
   * This will emit value to subscribers whenever new value is available
   * It will return object as {
      currentState,
      currentGroup,
      presentId,
      projectId
    }
   */
  getRealTimeStates() {
    let s = new Subject<{
      currentState,
      currentGroup,
      presentId,
      projectId
    }>();

    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(`usersC`).doc(user.uid).snapshotChanges().subscribe(
            next => {
              let p = {
                currentState: next.payload.get('currentState'),
                currentGroup: next.payload.get('currentGroup'),
                presentId: next.payload.get('presentId'),
                projectId: next.payload.get('projectId')
              }
              s.next(p)


            }
          )
        }
      }
    )

    return s as Observable<{
      currentState,
      currentGroup,
      presentId,
      projectId
    }>
  }
}
