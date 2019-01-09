import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/firestore";
import {getPath} from "../../core/model/firstore-path";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {CurStateAndGroup} from "../presentation/presentation.component";
import {STATES} from "../../core/model/prsentation-control";

@Injectable({
  providedIn: 'root'
})
export class PresentationControlService {

  constructor(public firestore: AngularFirestore, private auth: AuthService) {
  }

  /**
   *Get list of groups particular project
   * @param pid
   */
  getGroupList(pid) {

    let s: BehaviorSubject<string[]> = new BehaviorSubject([])

    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid)).doc(pid).get().subscribe(
            next => {
              let groupList = []
              next.data().students.forEach(
                val => groupList.push(val.group)
              );

              s.next(groupList)

            }
          )
        }
      }
    )


    return s as Observable<string[]>
  }

  /**
   * Get real time states of presentation. That is saved as number
   * Model of state is saved as Enum
   * @param pid
   * @param presentId
   */
  getRealTimeStates(pid, presentId) {
    let s = new Subject<CurStateAndGroup>();
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).snapshotChanges().subscribe(
            next => {
              //Get specific attribute when new changes
              //
              if (next.payload.get('currentState') == undefined)
                this.setStates(STATES.finished, '', pid, presentId);
              let p = {
                currentState: next.payload.get('currentState'),
                currentGroup: next.payload.get('currentGroup')
              } as CurStateAndGroup
              s.next(p)


            }
          )
        }
      }
    )

    return s as Observable<CurStateAndGroup>
  }

  /**
   * Set new states
   * @param state state number
   * @param groupId Current group
   * @param pid project id original
   * @param presentId
   * @param nProjectId
   */
  setStates(state, groupId, pid, presentId, nProjectId = 154) {
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).update({
            currentState: state,
            currentGroup: groupId
          });

          let id = user.uid;
          this.firestore.collection(`usersC`).doc(id).update({
            currentState: state,
            currentGroup: groupId,
            presentId: presentId,
            projectId: nProjectId
          })
        }
      }
    )

  }

  /**
   * Set started time in presentation doc
   * @param pid
   * @param presentId
   */
  setStartedTime(pid, presentId) {
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).update({
            startTime: new Date()
          })
        }
      }
    )
  }

  /**
   * Get started time
   * @param pid
   * @param presentId
   */
  getStartedTime(pid, presentId) {
    let s = new Subject<any>()
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).snapshotChanges().subscribe(
            next => s.next(next.payload.get('startTime'))
          )
        }
      }
    )
    return s as Observable<any>
  }

  /**
   * Get list of group currently submitted
   * @param pid
   * @param presentId
   */
  getFinishedList(pid, presentId) {
    let s = new Subject<any>();
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).get().subscribe(
            next => {
              let list = next.data().finishedList;
              if (list == undefined)
                s.next([])
              else
                s.next(list)


            }
          )
        }
      }
    )

    return s as Observable<any[]>
  }


  setFinishedList(finishedList, pid, presentId) {
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          return this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).update({finishedList: finishedList})
        }
        else
          return of(null)
      }
    )

  }

  /**
   * Get list of evaluators that have submitted the presentation
   * It updates in the real time
   * @param pid
   * @param presentId
   * @param group
   */

  getSubmissionStatus(pid, presentId, group) {
    let s = new Subject<DocumentChangeAction<any>[]>()
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          return this.firestore.collection(`/usersC/${user.uid}/project/${pid}/mark/${group}/${presentId}`).snapshotChanges().subscribe(next => {
            s.next(next)
          })
        }
      }
    )

    return s as Observable<DocumentChangeAction<any>[]>
  }


}
