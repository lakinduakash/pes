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


    //Get current eval list
    this.evalS.getEvalList().subscribe(
      next => {
        //Get dialog data
        let knew = this.data.eval;

        //For each doc
        next.docs.forEach(item => {



          let evalData = {uid: item.data().uid, displayName: item.data().displayName, email: item.data().email}
          //Push each eval data to lis
          this.evalList.push(evalData)

          //If evaluator have uid then None will show in evaluator list
          if (knew.uid) {
            if (evalData.uid == knew.uid) {
              this.selectedEval = evalData
            }
          } else {
            //Set display name None
            this.selectedEval = {displayName: 'None'}
          }

        });
        //Finish loading
        this.showSpin = false

        //Select selected eval
        this.oldSelectedEval = this.selectedEval
      }, error1 => this.showSpin = false)

  }

  /**
   * This function will be executed when new evaluator selected from list
   * @param e
   */
  onSelection(e: MatRadioChange) {
    if (this.oldSelectedEval.displayName !== this.selectedEval.displayName) {
      this.selectionChanged = true
      this.buttonName = "Save Changes"
    } else {
      this.selectionChanged = false
    }

  }


  /**
   * Let parrent know assign button is clicked
   */
  assign() {
    if (this.selectionChanged)
      this.onAssign.emit()
  }

}

/**
 * Model for Evaluato details
 */
class Evaluator {
  displayName: string
  email: string
  uid: string

}

/**
 * Model for dialog data
 */
export interface DialogData {
  evalList: any[]
  eval
}
