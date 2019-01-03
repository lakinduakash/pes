import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { Marks } from '../interfaces/marks';


@Injectable({
  providedIn: 'root'
})
export class ViewmarksService {

  markList: AngularFirestoreCollection<Marks>;
  mList: Observable<Marks[]>;

  constructor(public afs: AngularFirestore) {
    this.mList = this.afs.collection('form').valueChanges();
   }

  getMarks(){
    return this.mList;
  }

  
}
