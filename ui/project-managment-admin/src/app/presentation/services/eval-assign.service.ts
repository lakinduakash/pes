import {Injectable} from '@angular/core';
import {FormService} from "../../services/form.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {FormDataService} from "../../services/form-data.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import * as firebase from "firebase";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EvalAssignService {

  public reload: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(private formService: FormService, private fs: AngularFirestore, private formData: FormDataService, private as: AuthService) {
  }

  /**
   * Assign evaluator to specific form
   * @param data eval data
   * @param oldValue if form has previously assigned we hav to remove it
   */
  assignEvaluators(data: AssigneeData, oldValue: AssigneeData) {

    //Update form
    this.formService.updateForm(this.formData.projectId, this.formData.presentationId, data.formId, {assign: data.evaluator});

    //Evaluator have selected
    if (data.evaluator.uid) {
      this.fs.collection('usersE').doc(data.evaluator.uid).update(
        {
          //Find array and join the new value to array if not exist
          presentations: firebase.firestore.FieldValue.arrayUnion(
            {
              formId: data.formId,
              projectId: this.formData.projectId,
              presentId: this.formData.presentationId,
              uid: this.as.cacheUser.uid
            } as EvalPresentationData
          )
        }
      ).then(then => {
        //Reload the list
        this.reload.next(true)
      })

      //Remove old value
      this.removeFormFromEvaluator(oldValue)
    } else {

      this.removeFormFromEvaluator(oldValue)
      this.reload.next(true)
    }
  }


  /**
   * Remove old value assignee data in both form and eval collection
   * @param data
   */
  removeFormFromEvaluator(data: AssigneeData) {

    if (data.evaluator && data.evaluator.uid) {
      this.fs.collection('usersE').doc(data.evaluator.uid).update(
        {
          presentations: firebase.firestore.FieldValue.arrayRemove(
            {
              formId: data.formId,
              projectId: this.formData.projectId,
              presentId: this.formData.presentationId,
              uid: this.as.cacheUser.uid
            } as EvalPresentationData
          )
        })
    }


  }


  /**
   * Get assignee data from form
   * @param formId
   */
  getAssignee(formId) {
    let s = new Subject<any>();
    this.formService.getForm(formId, this.formData.projectId, this.formData.presentationId).subscribe(
      next => s.next(next.data().assign)
    )

    return s as Observable<any>
  }



}

export class AssigneeData {

  formId: string
  evaluator: any
}

export interface EvalPresentationData {
  formId: string
  uid: string
  projectId: string
  presentId: string

}
