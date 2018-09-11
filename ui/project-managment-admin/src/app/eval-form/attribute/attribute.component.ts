import {Component, Input, OnInit} from '@angular/core';
import {SectionAttribute} from "../../core/model/form-model";

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input("sectionAttributes") sectionA: SectionAttribute;

  constructor() {
  }

  ngOnInit() {
  }

}
