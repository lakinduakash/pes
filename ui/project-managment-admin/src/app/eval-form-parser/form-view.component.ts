import {Component, Input, OnInit} from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";
import {FormService} from "../services/form.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input('eval-form')evalForm

  constructor(private formService:FormService,private route: ActivatedRoute, private router: Router) { }

  form:FormModel
  sectionList:Section[];

  title
  description

  private routeId: string;

  ngOnInit() {
    this.route.paramMap.subscribe(next => this.routeId = next.get('id'))
    console.log(this.routeId)

    this.formService.getForm(this.routeId).subscribe(next=>{this.form=next.data() as FormModel; this.printForm()},error1 => console.log(error1))

  }

  printForm()
  {
    console.log(this.form)
    this.sectionList=this.form.sections
    this.title=this.form.name
    this.description=this.form.description
  }



}
