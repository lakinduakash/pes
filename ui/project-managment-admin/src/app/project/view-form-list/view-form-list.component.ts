import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormService} from "../../services/form.service";
import {FormDataService} from "../../services/form-data.service";

@Component({
  selector: 'app-view-form-list',
  templateUrl: './view-form-list.component.html',
  styleUrls: ['./view-form-list.component.css']
})
export class ViewFormListComponent implements OnInit {

  @Output('shareForm') share: EventEmitter = new EventEmitter()
  @Output('editForm') edit: EventEmitter = new EventEmitter()

  showSpinner = true

  constructor(private formService: FormService, public formData: FormDataService) {
  }

  formList=[]

  ngOnInit() {

    this.formService.getAllForm(this.formData.projectId, this.formData.presentationId).subscribe(next => {
        this.initList(next)
        this.showSpinner = false
      },
      error1 => this.showSpinner = false)
  }

  initList(docs){

    docs.docs.forEach(item => this.formList.push({id: item.ref.id, data: item.data().name}))
    console.log(this.formList)

  }


  shareForm(id) {
    this.share.emit(id)
  }

  editForm(id) {
    this.share.emit(id)
  }

}
