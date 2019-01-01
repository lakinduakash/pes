import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, QuerySnapshot} from "@angular/fire/firestore";
import {AuthService} from "../auth/auth.service";
import {Observable, Subject} from "rxjs";
import {Presentation} from "../core/model/presentation";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  uid;

  constructor(public fireStore: AngularFirestore,private authS:AuthService) {

    authS.user.subscribe(
      next => {
        if (next != null)
          this.uid = next.uid
        else
          this.uid = null

      }
    )
  }

  addPresentation(pid:number,data:Presentation)
  {
    let s:Subject<DocumentReference>=new Subject<DocumentReference>();

    this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
      .onSnapshot(next=>{console.log(next.docs);
        console.log(this.uid);
        next.docs.forEach(item=>
        {
          console.log(item.id);
          this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).add(data).then(next=>
          s.next(next))
        }
        )}
      );

    return s as Observable<DocumentReference>;
  }

  getPresentation(pid:number,id?:string)
  {
    if(id==undefined)
    {
      let fpid: Subject<QuerySnapshot<any>> = new Subject();

        this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
          .onSnapshot(next=>
            next.docs.forEach(item=>{
              this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).get().subscribe(next=>
              fpid.next(next))

              }
            )
          );

      return fpid as Observable<QuerySnapshot<any>>;
    }
    else
    {
      let fpid: Subject<any> = new Subject();

      this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
        .onSnapshot(next=>
          next.docs.forEach(item=>{
              this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).doc(id).get().subscribe(
                next=>{
                  fpid.next(next)
                },error1 =>
                {
                  fpid.error(error1)
                }
              )

            }
          )
        );
      return fpid as Observable<any>;
    }
  }



  deletePresentation(pid:number,id:string)
  {
    let fpid:Subject<any>=new Subject();

    this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
      .get().then(next =>
        next.docs.forEach(item=>{
            fromPromise(this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).doc(id).delete()).
            subscribe(next=>
                fpid.next(next)
              ,error1 => fpid.next(error1)
            )
          }
        )
      );
    return fpid;
  }

  getPresentationList(pid: number) {
    let fpid: Subject<QuerySnapshot<any>> = new Subject();


    this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
      .onSnapshot(next =>
        next.docs.forEach(item => {
            this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).ref.onSnapshot(
              next => fpid.next(next)
            )

          }
        )
      );

    return fpid as Observable<QuerySnapshot<any>>;

  }
}
