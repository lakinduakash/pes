import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {EvalService} from "../../services/eval.service";
import {MAT_DIALOG_DATA, MatRadioChange} from "@angular/material";

@Component({
  selector: 'app-eval-list',
  templateUrl: './eval-list.component.html',
  styleUrls: ['./eval-list.component.css']
})
export class EvalListComponent implements OnInit {

  @Input('formData') formData

  onAssign: EventEmitter<any> = new EventEmitter<any>()

  evalList = [{displayName: 'None'}];
  showSpin = true;

  selectedEval

  oldSelectedEval

  selectionChanged = false

  buttonName = 'Assign'


  constructor(private evalS: EvalService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {


    this.evalS.getEvalList().subscribe(
      next => {
        let knew = this.data.eval;

        next.docs.forEach(item => {


          let evalData = {uid: item.data().uid, displayName: item.data().displayName, email: item.data().email}
          this.evalList.push(evalData)

          if (knew.uid) {
            if (evalData.uid == knew.uid) {
              this.selectedEval = evalData
            }
          } else {
            this.selectedEval = {displayName: 'None'}
          }

        });
        this.showSpin = false

        this.oldSelectedEval = this.selectedEval
      }, error1 => this.showSpin = false)

  }

  onSelection(e: MatRadioChange) {
    if (this.oldSelectedEval.displayName !== this.selectedEval.displayName) {
      this.selectionChanged = true
      this.buttonName = "Save Changes"
    } else {
      this.selectionChanged = false
    }

  }


  assign() {
    if (this.selectionChanged)
      this.onAssign.emit()
  }

}

class Evaluator {
  displayName: string
  email: string
  uid: string

}

export interface DialogData {
  evalList: any[]
  eval
}
