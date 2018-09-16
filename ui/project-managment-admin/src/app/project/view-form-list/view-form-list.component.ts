import {Component, OnInit} from '@angular/core';
import {FormService} from "../../services/form.service";

@Component({
  selector: 'app-view-form-list',
  templateUrl: './view-form-list.component.html',
  styleUrls: ['./view-form-list.component.css']
})
export class ViewFormListComponent implements OnInit {

  constructor(private formService:FormService) { }

  formList=[]

  ngOnInit() {
    this.formService.getAllForm().subscribe(next=>this.initList(next))
  }

  initList(docs){

    docs.docs.forEach(item=> this.formList.push(item.ref.id))
    console.log(this.formList)

  }



}
