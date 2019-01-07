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

  getRealTimeStates(pid, presentId) {
    let s = new Subject<CurStateAndGroup>();
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).snapshotChanges().subscribe(
            next => {
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

  setStates(state, groupId, pid, presentId, nProjectId) {
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
