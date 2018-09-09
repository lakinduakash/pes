import {Injectable} from '@angular/core';
import {ProjectCard} from "../core/model/project-card";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {from} from "rxjs/internal/observable/from";
import {Subject} from "rxjs/internal/Subject";
import {FormModel} from "../core/model/form-model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  constructor(public fireDb: AngularFireDatabase, public fireStore: AngularFirestore) {

  }

  createProject(projectCard) {
    //this.fireDb.list('/project').push(projectCard);
    console.log(projectCard);

    this.getLastId().subscribe(next => {
      projectCard.id = next as number;
      console.log(projectCard);
      this.fireStore.collection('project').add(projectCard);
      this.updateLastId()

    });

    return projectCard
  }

  deleteProject(id: number) {
    this.fireStore.collection('project').ref.where('id', '==', id).onSnapshot(
      next => next.docs.forEach(item =>
        this.fireStore.collection('project').ref.doc(item.id).delete()))
  }

  getProjectList() {
    let ref = this.fireStore.collection('project');

    let sub = new Subject<ProjectCard[]>();


    ref.ref.onSnapshot(next => {
      let arr: ProjectCard[] = [];

      next.docs.forEach(
        item => arr.push(item.data() as ProjectCard)
      );
      sub.next(arr)
    });

    return sub.asObservable()

  }


  getLastId() {
    let ass = new Subject();

    let ob = from(this.fireStore.collection('lastProjectId').ref.doc('DhUGQJCUsgHpUMtCMshh').get());
    ob.subscribe(next => {
      ass.next(next.data().last_id)
    });

    return ass
  }

  saveForm(form: FormModel) {

    //let f=JSON.stringify(form)
    //let k = f.replace(/\\/g, "");


    let i = this.fireStore.collection("form").add(form);
    console.log(i)
  }

  private updateLastId() {
    this.getLastId().subscribe(next => {
      let last_id = next as number + 1;
      this.fireStore.collection('lastProjectId').doc('DhUGQJCUsgHpUMtCMshh').update({last_id: last_id})
    })
  }


}

