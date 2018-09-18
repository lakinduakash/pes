import {Component, Input, OnInit} from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";
import {FormService} from "../services/form.service";
import {FormDataService} from "../services/form-data.service";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {FormEditEventService} from "./form-edit-event.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input("sections") sectionList: Section[];
  @Input("formModel") form: FormModel;
  @Input('DocRef') documentRef: string;

  formTitle = "Untitled";
  formDesc;
  id = 5;


  projectId
  presentId

  saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"

  private static lastSecId = 0;


  constructor(private formService: FormService,
              public formDataService: FormDataService,
              private titleBar: RenameTitleBarService,
              public formEditEvent: FormEditEventService) {
  }

  ngOnInit() {
    this.titleBar.setTitle("Create new form")
    if (this.form != undefined) {
      this.formTitle = this.form.name;
      this.formDesc = this.form.description;
      this.id = this.form.id;
    }

    this.projectId = this.formDataService.projectId
    this.presentId = this.formDataService.presentationId
    this.formEditEvent.event.subscribe(next => console.log("edited"))

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



  onSaveFormClick() {
      // this.sectionList = this.sectionList.map((obj) => {
      //   return Object.assign({}, obj)
      // });

      if (this.documentRef == undefined) {


        this.form = {
          id: this.id,
          description: this.formDesc,
          sections: this.sectionList,
          name: this.formTitle
        } as FormModel;

        if (this.form.sections != undefined && this.sectionList.length > 0) {

          this.formService.saveForm(this.form, this.projectId, this.presentId).subscribe(next => {
            this.documentRef = next.id
            console.log("saved" + next.id)
            this.saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
          }, error => console.log("error)"))
        }
        else {
          console.log("empty sections")
        }
      }
      else {
        this.updateForm()
      }

  }

  private updateForm() {


    if (this.form != undefined && this.documentRef != undefined) {
      this.form = {
        id: this.id,
        description: this.formDesc,
        sections: this.sectionList,
        name: this.formTitle
      } as FormModel;
      this.formService.updateForm(this.projectId, this.presentId, this.documentRef, this.form).subscribe(next => {
        (console.log("updated"))

      }, error => console.log("error)"))
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
