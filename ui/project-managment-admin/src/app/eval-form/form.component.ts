import {Component, Input, OnInit} from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input("sections") sectionList: Section[];
  @Input("formModel") form: FormModel;

  title;
  description;
  id;


  constructor() {
  }

  ngOnInit() {
    if (this.form != undefined) {
      this.title = this.form.name;
      this.description = this.form.description;
      this.id = this.form.id;
    }
  }

  onAddSectionClick() {
    let mSection = new Section();

    if (this.sectionList != undefined) {
      this.sectionList.push(mSection)
    }
    else {
      this.sectionList = [];
      this.sectionList.push(mSection)
    }


  }

  onRemoveSectionClick() {
    if (this.sectionList != undefined && this.sectionList.length > 0) {
      this.sectionList.splice(this.sectionList.length - 1, 1)
    }

  }

  renderSection() {

  }

}
