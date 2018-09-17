import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SectionAttribute} from "../../core/model/form-model";

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input("sectionAttribute") sectionA: SectionAttribute;
  @Output('delete') deleteAttribute = new EventEmitter();

  criteria;
  maxMark;

  constructor() {
  }

  ngOnInit() {
    if (this.sectionA != undefined) {
      this.sectionA.criteria = this.criteria;
      this.sectionA.maxMark = this.maxMark
    }
  }

  saveForm() {
    if (this.sectionA != undefined) {
      this.sectionA.criteria = this.criteria;
      this.sectionA.maxMark = this.maxMark
    }
  }

  delete() {
    this.deleteAttribute.emit(this.sectionA.id)
  }

}
