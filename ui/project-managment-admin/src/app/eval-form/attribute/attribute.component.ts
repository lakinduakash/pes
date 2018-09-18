import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SectionAttribute} from "../../core/model/form-model";
import {FormEditEventService} from "../form-edit-event.service";

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

  constructor(public formEditEvent: FormEditEventService) {
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
    this.formEditEvent.event.emit()
  }

  delete() {
    this.deleteAttribute.emit(this.sectionA.id)
  }

}
