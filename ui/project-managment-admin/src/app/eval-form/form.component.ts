import {Component, Input, OnInit} from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";
import {FormService} from "../services/form.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input("sections") sectionList: Section[];
  @Input("formModel") form: FormModel;

  formTitle;
  formDesc;
  id = 5;

  private static lastSecId = 0;


  constructor(private formService: FormService) {
  }

  ngOnInit() {
    if (this.form != undefined) {
      this.formTitle = this.form.name;
      this.formDesc = this.form.description;
      this.id = this.form.id;
    }
  }

  onAddSectionClick() {
    let mSection = new Section();
    mSection.id = FormComponent.lastSecId++;

    if (this.sectionList != undefined) {
      this.sectionList.push(mSection)
    }
    else {
      this.sectionList = [];
      this.sectionList.push(mSection)
    }

    console.log(this.sectionList)


  }


  renderSection() {

  }

  onSaveFormClick() {
    if (this.sectionList != undefined) {

      this.sectionList = this.sectionList.map((obj) => {
        return Object.assign({}, obj)
      });
      if (this.form != undefined) {
        this.form = {
          id: this.id,
          description: this.formDesc,
          sections: this.sectionList,
          name: this.formTitle
        } as FormModel;
        this.formService.saveForm(this.form)
      }
      else {
        this.form = {
          id: this.id,
          description: this.formDesc,
          sections: this.sectionList,
          name: this.formTitle
        } as FormModel;
        this.formService.saveForm(this.form)

      }
    }
  }

  deleteSection($event) {
    let i = 0;
    for (let sec of this.sectionList) {
      if (sec.id == $event as number) {
        this.sectionList.splice(i, 1)

      }
      i++;

    }
  }

}
