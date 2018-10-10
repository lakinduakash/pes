import {Injectable} from '@angular/core';
import {FormService} from "../../services/form.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {FormDataService} from "../../services/form-data.service";
import {Observable, Subject} from "rxjs";
import * as firebase from "firebase";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EvalAssignService {

  constructor(private formService: FormService, private fs: AngularFirestore, private formData: FormDataService, private as: AuthService) {
  }

  assignEvaluators(data: AssigneeData) {
    this.formService.updateForm(this.formData.projectId, this.formData.presentationId, data.formId, {assign: data.evalList})
    data.evalList.forEach(
      item => {
        this.fs.collection('usersE').doc(item.uid).update(
          {
            presentations: firebase.firestore.FieldValue.arrayUnion(
              {
                formId: data.formId,
                projectId: this.formData.projectId,
                presentId: this.formData.presentationId,
                uid: this.as.cacheUser.uid
              } as EvalPresentationData
            )
          }
        )
      }
    )


  }


  removeFormFromEvaluator(data) {
    data.evalList.forEach(
      item => {
        this.fs.collection('usersE').doc(item.uid).update(
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
    )
  }

  getAssigneeList(data) {
    let s = new Subject<any>();
    this.formService.getForm(data.id, this.formData.projectId, this.formData.presentationId).subscribe(
      next => s.next(next.data().assign)
    )
    return s as Observable<any>
  }


}

export interface AssigneeData {
  formId: string
  evalList: any[]
}

export interface EvalPresentationData {
  formId: string
  uid: string
  projectId: string
  presentId: string

}
