import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, QuerySnapshot} from "@angular/fire/firestore";
import {AuthService} from "../auth/auth.service";
import {Observable, Subject} from "rxjs";

import {fromPromise} from "rxjs/internal-compatibility";
import {PresentationData} from "../core/model/presentation";

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  uid;

  constructor(public fireStore: AngularFirestore,private authS:AuthService) {

    //Store the uid on service creation
    authS.user.subscribe(
      next => {
        if (next != null)
          this.uid = next.uid
        else
          this.uid = null

      }
    )
  }

  /**
   * Add new presentation to project document
   * @param pid Simplified project id
   * @param data presentation data
   */
  addPresentation(pid: number, data: PresentationData) {
    let s:Subject<DocumentReference>=new Subject<DocumentReference>();

    //Get the original project id and then save data to presentation collection
    this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
      .onSnapshot(next=>{console.log(next.docs);
        console.log(this.uid);
        next.docs.forEach(item=> {
            console.log(item.id);
            this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).add(data).then(next=>
              s.next(next))
          }
        )}
      );

    return s as Observable<DocumentReference>;
  }

  /**
   * Get presentation data
   * If presentation doc id is not defined ffunction will return all the presentation list
   * @param pid Simplified project id
   * @param id presentation doc id
   */
  getPresentation(pid:number, id?:string) {
    //Check presentation id is defined
    if(id==undefined) {
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
    //If presentation id is not defined it will return the all documents in project presentation collection
    else {
      let fpid: Subject<any> = new Subject();

      this.fireStore.collection(`usersC/${this.uid}/project`).ref.where('id', '==', pid)
        .onSnapshot(next=>
          next.docs.forEach(item=>{
              this.fireStore.collection(`usersC/${this.uid}/project/${item.id}/presentation`).doc(id).get().subscribe(
                next=>{
                  fpid.next(next)
                }, error1 => {
                  fpid.error(error1)
                }
              )

            }
          )
        );
      return fpid as Observable<any>;
    }
  }

  /**
   * Get presentation doc by original project id
   * @param opid
   * @param prid
   */
  getPresentationByOriginalProjectId(opid, prid) {
    let fpid: Subject<any> = new Subject();


    this.fireStore.collection(`usersC/${this.uid}/project/${opid}/presentation`).doc(prid).get().subscribe(
      next => {
        fpid.next(next.data())
      }, error1 => {
        fpid.error(error1)
      }
    )

    return fpid as Observable<any>;
  }


  /**
   * Delete presentation
   * @param pid Simplified project number
   * @param id presentation id
   */
  deletePresentation(pid:number,id:string)
  {
    let fpid: Subject<any> = new Subject()
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

  /**
   * Get list of presentation
   * @param pid Simplified project id
   */
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
