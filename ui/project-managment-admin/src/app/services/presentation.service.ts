import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference, DocumentSnapshot} from "@angular/fire/firestore";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject, Observable, Observer, Subject} from "rxjs";
import {Presentation} from "../core/model/presentation";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  uid;

  constructor(public fireStore: AngularFirestore,private authS:AuthService) {

    authS.user.subscribe(next=>this.uid=next.uid)
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

    return s as Observable;
  }

  getPresentation(pid:number,id?:string)
  {
    if(id==undefined)
    {
      let fpid:Subject=new Subject();

        this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
          .onSnapshot(next=>
            next.docs.forEach(item=>{
              this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).get().subscribe(next=>
              fpid.next(next))

              }
            )
          );

      return fpid;
    }
    else
    {
      let fpid:Subject<DocumentSnapshot>=new Subject();

      this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
        .onSnapshot(next=>
          next.docs.forEach(item=>{
              this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).doc(id).get().subscribe(
                next=>{
                  fpid.next(next|undefined)
                },error1 =>
                {
                  fpid.error(error1)
                }
              )

            }
          )
        );
      return fpid;
    }
  }



  deletePresentation(pid:number,id:string)
  {
    let fpid:Subject<any>=new Subject();

    this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
      .onSnapshot(next=>
        next.docs.forEach(item=>{
            fromPromise(this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).doc(id).delete()).
            subscribe(next=>
              fpid.next(next|undefined)
              ,error1 => fpid.next(error1)
            )
          }
        )
      );
    return fpid;
  }
}
