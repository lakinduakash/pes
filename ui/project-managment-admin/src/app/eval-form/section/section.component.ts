import {Component, Input, OnInit} from '@angular/core';
import {SectionAttribute} from "../../core/model/form-model";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() attr: SectionAttribute[];

  constructor() {
  }

  ngOnInit() {
  }

  onAddCriteriaClick() {
    let a = new SectionAttribute();
    if (this.attr != undefined) {
      this.attr.push(a)
    }
    else {
      this.attr = [];
      this.attr.push(a)

    }
  }

  onRemoveCriteriaClick() {
    if (this.attr != undefined && this.attr.length > 0)
      this.attr.splice(this.attr.length - 1, 1)

  }

}
