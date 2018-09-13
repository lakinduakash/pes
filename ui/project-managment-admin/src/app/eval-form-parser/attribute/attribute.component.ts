import {Component, Input, OnInit} from '@angular/core';
import {SectionAttribute} from "../../core/model/form-model";

@Component({
  selector: 'app-attribute-parser',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input('sectionAtrr')attr:SectionAttribute

  criteria;
  maxMarks;

  constructor() { }

  ngOnInit() {
    this.criteria=this.attr.criteria
    this.maxMarks=this.attr.maxMark
  }

}
