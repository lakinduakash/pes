import { Component, OnInit } from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";
import {FormService} from "../services/form.service";


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  constructor(private formService:FormService) { }

  form:FormModel
  sectionList:Section[];

  title
  description

  ngOnInit() {
    this.formService.getForm(5).subscribe(next=>{this.form=next.data() as FormModel; this.printForm()},error1 => console.log(error1))

  }

  printForm()
  {
    console.log(this.form)
    this.sectionList=this.form.sections
    this.title=this.form.name
    this.description=this.form.description
  }

}
