import {Injectable} from '@angular/core';
import {ProjectCard} from "../core/model/project-card";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {from} from "rxjs/internal/observable/from";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  id = 3;
  ex = [{id: 1, owner: "Lakindu", cardTitle: "2nd Year", description: " blah blah blah"}, {
    id: 2,
    owner: "Ayesh",
    cardTitle: "3rd year",
    description: "blag blah blah"
  }];

  projectList: FirebaseListObservable<ProjectCard[]>;

  constructor(public fireDb: AngularFireDatabase, public fireStore: AngularFirestore) {

  }

  createProject(projectCard) {
    this.fireDb.list('/project').push(projectCard);

    return {
      id: projectCard.id,
      owner: projectCard.owner,
      cardTitle: projectCard.cardTitle,
      description: projectCard.description
    } as ProjectCard
  }

  getProjectList() {
    let ref = this.fireStore.collection('project');

    this.updateLastId();

    ref.ref.where("id", '==', 5).onSnapshot(next => console.log(next.docs[0].id));
    return this.projectList = this.fireDb.list('/project').valueChanges() as FirebaseListObservable<ProjectCard[]>
  }


  getLastId() {
    let ass = new Subject();

    let ob = from(this.fireStore.collection('lastProjectId').ref.doc('DhUGQJCUsgHpUMtCMshh').get());
    ob.subscribe(next => {
      ass.next(next.data().last_id)
    });

    return ass
  }

  private updateLastId() {
    this.getLastId().subscribe(next => {
      let last_id = next;
      console.log('lastId ' + last_id);
      this.fireStore.collection('lastProjectId').doc('DhUGQJCUsgHpUMtCMshh').update({last_id: last_id})
    })
  }


}

