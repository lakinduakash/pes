import {Injectable} from '@angular/core';
import {FormService} from "../../services/form.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {FormDataService} from "../../services/form-data.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvalAssignService {

  constructor(private formService: FormService, private fs: AngularFirestore, private formData: FormDataService) {
  }

  assignEvaluators(data: AssigneeData) {
    this.formService.updateForm(this.formData.projectId, this.formData.presentationId, data.formId, {assign: data.evalList})
  }

  getAssigneeList(data) {
    let s = new Subject<any>();
    this.formService.getForm(data.id, this.formData.projectId, this.formData.presentationId).subscribe(
      next => s.next(next.data().assign)
    )

    return s as Observable
  }


}

export interface AssigneeData {
  formId: string
  evalList: any[]
}
