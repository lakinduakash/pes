import {Injectable} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {AngularFirestore, CollectionReference} from "@angular/fire/firestore";
import {ProjectService} from "../../services/project.service";
import {from, Observable, Subject} from "rxjs";
import {getPath} from "../../core/model/firstore-path";

@Injectable({
  providedIn: 'root'
})
export class MarkingService {

  constructor(public auth: AuthService,
              public fireStore: AngularFirestore,
              public projectService: ProjectService) {
  }

  getMArkForm(projectId, presentId, group, evalid) {
    let s = new Subject();
    this.auth.user.subscribe(
      user => {
        if (user != null) {
          this.fireStore.collection(getPath(user.uid, projectId) + `/${projectId}/mark/${group}/${presentId}`).doc(evalid).get().subscribe(next => s.next(next.data()))
        }
      }
    )

    return s as Observable<any>
  }

  getAllGroupMarksOfPresentation(projectId, presentId): Observable<GroupMarkPresentation> {
    let s = new Subject<GroupMarkPresentation>()
    let collectionRefs: { refs: CollectionReference, group: string }[] = []
    this.auth.user.subscribe(
      user => {
        if (user != null) {
          let gmps: GroupMarkPresentation[] = [];

          this.fireStore.collection(getPath(user.uid, projectId) + `/${projectId}/mark`).get().subscribe(docs => {
            docs.forEach(doc => {
              console.log(doc.id)

              collectionRefs.push({refs: doc.ref.collection(presentId), group: doc.id})
            })

            collectionRefs.forEach(refs => {

              let g = new GroupMarkPresentation();
              g.group = refs.group;
              g.presentId = presentId

              let arr = [];
              from(refs.refs.get()).subscribe(evalForms => {
                evalForms.forEach(form => arr.push(form.data()))

                g.forms = arr;
                s.next(g)
              })

            })

          })
        }
      }
    )

    return s as Observable<GroupMarkPresentation>
  }

  getAllPresentationIds(projectId) {

    let s = new Subject<string[]>();
    this.auth.user.subscribe(
      user => {
        if (user != null) {
          this.fireStore.collection(getPath(user.uid, projectId) + `/${projectId}`).ref.get().then(docs => {
              let arr = []
              docs.forEach(item => arr.push(item.id))
              s.next(arr)
            }
          )
        }
      }
    )

    return s as Observable<any[]>
  }

}

export class GroupMarkPresentation {
  presentId
  group: string
  forms: any[]
}

