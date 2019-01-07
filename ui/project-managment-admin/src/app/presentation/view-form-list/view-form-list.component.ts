import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormService} from "../../services/form.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {EvalAssignService} from "../services/eval-assign.service";

@Component({
  selector: 'app-view-form-list',
  templateUrl: './view-form-list.component.html',
  styleUrls: ['./view-form-list.component.css']
})
export class ViewFormListComponent implements OnInit {

  @Output('shareForm') share: EventEmitter<string> = new EventEmitter();
  @Output('editForm') edit: EventEmitter<string> = new EventEmitter();
  @Input('opid') pid
  @Input('presentid') prid
  @Input('formDetails') fetchDetail: Observable<boolean>;

  showSpinner = true;

  constructor(private formService: FormService, private router: Router, public evalAssignService: EvalAssignService) {
  }

  formList=[]

  ngOnInit() {

    this.evalAssignService.reload.subscribe(next => {
        this.formService.getAllForm(this.pid, this.prid).subscribe(next => {
            this.initList(next)
            this.showSpinner = false
          },
          error1 => this.showSpinner = false)
      }
    )

  }

  initList(docs){
    this.formList = []

    docs.docs.forEach(item => this.formList.push({
      id: item.ref.id,
      data: item.data().name,
      assign: item.data().assign.email
    }))
    console.log(this.formList)

  }


  shareForm(id) {
    this.share.emit(id)
  }

  editForm(id) {
    this.edit.emit(id)
  }

  viewForm(id) {
    this.router.navigate(['/form', {
      form: id,
      p: this.pid,
      pr: this.prid,
      edit: true
    }])
  }

}
