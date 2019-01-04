import {Component, Input, OnInit} from '@angular/core';
import {SectionAttribute} from "../../core/model/form-model";

@Component({
  selector: 'app-attribute-parser',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input('sectionAtrr')attr:SectionAttribute;

  criteria;
  maxMarks;
  numbers =[];

  constructor() {

  }

  ngOnInit() {
    this.criteria=this.attr.criteria;
    this.maxMarks=this.attr.maxMark;

    if (this.attr.isDecimal) {
      for (let i = 0; i <= this.maxMarks; i = i + 0.5) {
        this.numbers.push(i)
      }
    } else {
      for (let i = 0; i <= this.maxMarks; i++)
        this.numbers.push(i)
    }


  }

}
