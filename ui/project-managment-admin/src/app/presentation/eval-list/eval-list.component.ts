import {Component, OnInit} from '@angular/core';
import {EvalService} from "../../services/eval.service";

@Component({
  selector: 'app-eval-list',
  templateUrl: './eval-list.component.html',
  styleUrls: ['./eval-list.component.css']
})
export class EvalListComponent implements OnInit {

  evalList = []

  constructor(private evalS: EvalService) {
  }

  ngOnInit() {
    this.evalS.getEvalList().subscribe(
      next => {
        next.docs.forEach(item => this.evalList.push(item.data()))
        console.log(this.evalList)
      })
  }


}
