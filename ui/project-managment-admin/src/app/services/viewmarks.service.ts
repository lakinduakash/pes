import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewmarksService {

  markList: AngularFirestoreCollection<marks>;
  mList: Observable<marks[]>;

  constructor(public afs: AngularFirestore) {
    this.mList = this.afs.collection('form').valueChanges();
   }

  getMarks(){
    return this.mList;
  }

  
}

interface marks{
    description?: string;
    name?: string;
}