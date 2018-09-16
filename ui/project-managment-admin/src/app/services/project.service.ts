import {Injectable} from '@angular/core';
import {ProjectCard} from "../core/model/project-card";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {from} from "rxjs/internal/observable/from";
import {Subject} from "rxjs/internal/Subject";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  constructor(public fireDb: AngularFireDatabase, public fireStore: AngularFirestore,private authS:AuthService) {

  }

  createProject(projectCard) {
    this.authS.user.subscribe(nextU=>{
      console.log(projectCard);

      this.getLastId().subscribe(next => {if(nextU!=null) {
        projectCard.id = next as number;
        console.log(projectCard);
        this.fireStore.collection(`usersC/${nextU.uid}/project`).add(projectCard);
        this.updateLastId()
      }

      });

      }

    );


    return projectCard
  }

  deleteProject(id: number) {

    this.authS.user.subscribe(nextU=> {if(nextU!=null) {
      this.fireStore.collection(`usersC/${nextU.uid}/project`).ref.where('id', '==', id).onSnapshot(
        next => next.docs.forEach(item =>
          this.fireStore.collection(`usersC/${nextU.uid}/project`).ref.doc(item.id).delete()))
    }
    })
  }

  getProjectList() {
    let sub = new Subject<ProjectCard[]>();

    this.authS.user.subscribe(nextU=> {if(nextU!=null) {
      let ref = this.fireStore.collection(`usersC/${nextU.uid}/project`);




      ref.ref.onSnapshot(next => {
        let arr: ProjectCard[] = [];

        next.docs.forEach(
          item => arr.push(item.data() as ProjectCard)
        );
        sub.next(arr)
      });
    }});

    return sub.asObservable()

  }


  getLastId() {
    let ass = new Subject();

    let ob = from(this.fireStore.collection('lastProjectId').ref.doc('DhUGQJCUsgHpUMtCMshh').get());

    ob.subscribe(next => {
      ass.next(next.data().last_id);
    });

    return ass
  }


  private updateLastId() {
    this.getLastId().subscribe(next => {
      let last_id = next as number + 1;
      this.fireStore.collection('lastProjectId').doc('DhUGQJCUsgHpUMtCMshh').update({last_id: last_id})
    })
  }


}

