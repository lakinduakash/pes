import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {getPath} from "../../core/model/firstore-path";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {AuthService} from "../../auth/auth.service";

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

  getRealTimeStates(state, groupId, pid, presentId) {
    let s = new Subject<any>();
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).snapshotChanges().subscribe(
            next => {
              s.next(next.payload.data)


            }
          )
        }
      }
    )

    return s as Observable<any>
  }

  setStates(state, groupId, pid, presentId) {
    this.auth.user.subscribe(
      user => {
        if (user != null || user != undefined) {
          this.firestore.collection(getPath(user.uid, pid, presentId)).doc(presentId).update({
            currentState: state,
            currentGroup: groupId
          })
        }
      }
    )

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


}
