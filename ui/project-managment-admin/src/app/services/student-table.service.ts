import {Injectable} from '@angular/core';
import {filter, flatMap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {getPath} from "../core/model/firstore-path";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentTableService {

  constructor(private auth: AuthService, private fs: AngularFirestore) {
  }

  saveTable(projectId, tableData) {
    return this.auth.user.pipe(
      filter(value => value != null)
    ).subscribe(next => {
      this.fs.collection(getPath(next.uid, projectId)).doc(projectId).update({students: tableData})
    })


  }

  getTable(projectId) {
    let s: Subject<any> = new Subject<any>()
    return this.auth.user.pipe(
      filter(value => value != null),
      flatMap(next => this.fs.collection(getPath(next.uid, projectId)).doc(projectId).get())
    )
  }
}
