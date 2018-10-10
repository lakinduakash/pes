import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {EvalService} from "../../services/eval.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {DialogData} from "../../dashboard/add-project-dialog/add-project-dialog.component";

@Component({
  selector: 'app-eval-list',
  templateUrl: './eval-list.component.html',
  styleUrls: ['./eval-list.component.css']
})
export class EvalListComponent implements OnInit {

  @Input('formData') formData

  onAssign: EventEmitter<any> = new EventEmitter<any>()

  evalList = [];
  private showSpin = true;

  private selectionChanged = false

  selectedMap = new Map();

  buttonName = 'Assign'

  constructor(private evalS: EvalService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.evalS.getEvalList().subscribe(
      next => {
        let k = this.data as any[]
        console.log(k)

        next.docs.forEach(item => {

          if (k.find(x => x.uid === item.data().uid)) {
            this.evalList.push({data: item.data(), selected: true})
            this.selectedMap.set(item.data().uid, item.data())
          }
          else
            this.evalList.push({data: item.data(), selected: false})
        })
        this.showSpin = false
      }, error1 => this.showSpin = false)

  }

  onSelection(e) {
    this.selectionChanged = true
    this.buttonName = "Save Changes"
    if (e.option._selected) {
      this.selectedMap.set(e.option.value.uid, e.option.value)
    }
    else {
      this.selectedMap.delete(e.option.value.uid)
    }

    console.log(this.selectedMap)
  }


  private assign() {
    if (this.selectionChanged)
      this.onAssign.emit()
  }

}

class Evaluator {
  displayName: string
  email: string
  uid: string

}
