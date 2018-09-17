import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Section, SectionAttribute} from "../../core/model/form-model";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {


  @Input("section") section: Section;
  @Output("criteriaAdd") crAdd = new EventEmitter();
  @Output('deleteSection') deleteSection = new EventEmitter();

  secDesc;
  secTitle;

  private static lastId = 0;




  constructor() {
  }

  ngOnInit() {
    if (this.section != undefined) {
      this.secDesc = this.section.description;
      this.secTitle = this.section.name
    }

  }

  onAddCriteriaClick() {
    let a = new SectionAttribute();
    a.id = SectionComponent.lastId++;
    a = Object.assign({}, a);
    if (this.section.attr != undefined) {
      this.section.attr.push(a)
    }
    else {
      this.section.attr = [];
      this.section.attr.push(a)

    }

    this.crAdd.emit();
  }


  saveFormDetails() {
    this.section.name = this.secTitle;
    this.section.description = this.secDesc
  }

  delete() {
    this.deleteSection.emit(this.section.id)
  }

  deleteCriteria(id) {
    let i = 0;
    for (let attr of this.section.attr) {
      if (id == attr.id)
        this.section.attr.splice(i, 1);
      i++
    }
  }

}
