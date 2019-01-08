import {Injectable} from '@angular/core';
import {ProjectCard} from "../core/model/project-card";
import {from} from "rxjs/internal/observable/from";
import {Subject} from "rxjs/internal/Subject";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(public fireStore: AngularFirestore, private authS: AuthService) {

  }

  /**
   * create new project in users document.
   * @param projectCard details of the project {id,name,description}
   */

  createProject(projectCard) {

    //get the logged in user on subscribe to user changes, whenever user is changed (ex: logout and new user came)
    //it will return the new user
    this.authS.user.subscribe(nextU=>{
        console.log(projectCard);

        //after getting user, get the last id of the project that have previously created

        this.getLastId().subscribe(next => {
          if (nextU != null) {// check whether user is not null, null means user have signed out
            //get the last id as number (type casting)
            projectCard.id = next as number;
            console.log(projectCard);

            //save the project details to this path ->`usersC/${nextU.uid}/project`
            // nextU.uid is the unique id that user automatically get assigned when new user is created

            this.fireStore.collection(`usersC/${nextU.uid}/project`).add(projectCard);

            //after saving project details increment the last id and save it back to the database
            this.updateLastId()
          }

        });

      }
    );


    return projectCard
  }

  /**
   * Delete specific project
   * It will delete the all the related data to project
   * @param id
   */

  deleteProject(id: number) {

    //get the user and check whether user is not null (verify logged in)
    this.authS.user.subscribe(nextU=> {if(nextU!=null) {

      //query the document to find project that have provided id and delete that document
      //this will return collection of document that matches the query, but we can make sure there is only one document
      this.fireStore.collection(`usersC/${nextU.uid}/project`).ref.where('id', '==', id).onSnapshot(
        //Iterate through the list of document
        next => next.docs.forEach(item =>
          //Get the document reference and delete it
          this.fireStore.collection(`usersC/${nextU.uid}/project`).ref.doc(item.id).delete()))
    }
    })
  }

  /**
   * Get the list of project that user have
   */
  getProjectList() {

    //create new subject
    let sub = new Subject<ProjectCard[]>();

    this.authS.user.subscribe(nextU=> {if(nextU!=null) {
      //get the collection reference of `usersC/${nextU.uid}/project` path
      let ref = this.fireStore.collection(`usersC/${nextU.uid}/project`);


      // listen for changes of project collection and when new project are added it will emmit new list of documents
      ref.ref.onSnapshot(next => {
        //array to hold list
        let arr: ProjectCard[] = [];

        //get each document and append to array
        next.docs.forEach(
          item => arr.push(item.data() as ProjectCard)
        );

        //then emmit the new value from subject. Then all the subscribers will get the array
        sub.next(arr)
      });
    }});

    //return Subject as Observable object
    return sub.asObservable()

  }


  /**
   * get last project id.
   */
  getLastId() {
    let ass = new Subject();

    // it stored in fixed document in root of firebase
    let ob = from(this.fireStore.collection('lastProjectId').ref.doc('DhUGQJCUsgHpUMtCMshh').get());

    ob.subscribe(next => {
      ass.next(next.data().last_id);
    });

    return ass
  }


  /**
   * This will update the last id. It increment the id
   */
  private updateLastId() {
    //get the previous id
    this.getLastId().subscribe(next => {
      //Get it as number and increment it
      let last_id = next as number + 1;
      //save back to the database as incremented id
      this.fireStore.collection('lastProjectId').doc('DhUGQJCUsgHpUMtCMshh').update({last_id: last_id})
    })
  }


  /**
   * Check whether specific project exist by real document id of the project or simplified id
   * Parameters that are optional marked as ?
   * @param id_not_original Simplified id that mostly appeared in url
   * @param oid document id of the project
   */
  isProjectExist(id_not_original?, oid?) {
    //boolean subject
    let s:Subject<boolean> =new Subject();
    //get the user
    this.authS.user.subscribe(nextU=> {
      if (nextU != null) {

        //Check id_not_original is defined and then function is evaluated
        if (id_not_original)
          this.fireStore.collection(`usersC/${nextU.uid}/project`).ref.where('id', '==', id_not_original).onSnapshot(
            next => {
              if(next.docs.length==0) {
                s.next(false)
              } else {
                s.next(true)
              }
            }
          )
        //Check original id
        else if (oid) {
          this.fireStore.collection(`usersC/${nextU.uid}/project`).doc(oid).get().subscribe(
            next => {
              //emit the value
              s.next(next.exists)
            }
          )
        }
      }});

    return s as Observable<boolean>
  }


  /**
   * Get original project id based on simplified id. It returns the document id of project id
   * @param id
   */
  getOriginalProjectId(id: number) {

    let s: Subject<string> = new Subject();

    //get the cache user from auth service
    let nextU = this.authS.cacheUser

    //if user is not null
    if (nextU != null) {

      //query the document
      this.fireStore.collection(`usersC/${nextU.uid}/project`).ref.where('id', '==', id).onSnapshot(
        next => {
          console.log(id)
          next.docs.forEach(item => {
              console.log(item.id)
              s.next(item.id)
            }
          )
        },
        //return when error
        error1 => s.error(error1),
        //return when completed
        () => s.complete())
    }

    return s as Observable<string>

  }

  /**
   * Get complete project document with origianl project id
   * @param opid original project id
   */
  getProjectDoc(opid) {
    let s: Subject<any> = new Subject();
    let nextU = this.authS.cacheUser

    if (nextU != null) {
      this.fireStore.collection(`usersC/${nextU.uid}/project`).doc(opid).get().subscribe(
        next => {

          s.next(next.data())
        }
        ,
        error1 => s.error(error1),
        () => s.complete())
    }

    return s as Observable<any>
  }
}

