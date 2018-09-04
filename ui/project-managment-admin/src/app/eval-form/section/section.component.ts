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

  secDesc;
  secTitle;




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
    if (this.section.attr != undefined) {
      this.section.attr.push(a)
    }
    else {
      this.section.attr = [];
      this.section.attr.push(a)

    }

    this.crAdd.emit();
  }

  onRemoveCriteriaClick() {
    if (this.section.attr != undefined && this.section.attr.length > 0)
      this.section.attr.splice(this.section.attr.length - 1, 1)

  }

  saveFormDetails() {
    this.section.name = this.secTitle;
    this.section.description = this.secDesc
  }

}
