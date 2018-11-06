import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {getPath} from "../../core/model/firstore-path";
import {BehaviorSubject, Observable} from "rxjs";
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


}
