import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject, Observable, Observer, Subject} from "rxjs";
import {Presentation} from "../core/model/presentation";

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

  getPresentation(pid,id?)
  {
    if(id!=undefined)
    {
      let fpid:Subject<any>;

        this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
          .onSnapshot(next=>
            next.docs.forEach(item=>{
              return this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).get()

              }
            )
          );

      return fpid;
    }
    else
    {
      return this.fireStore.collection(`usersC/${this.uid}/projects`).get()
    }
  }

  deletePresentation(pid,id)
  {

  }
}
