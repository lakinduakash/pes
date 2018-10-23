import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";
import {FormService} from "../services/form.service";
import {FormDataService} from "../services/form-data.service";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {FormEditEventService} from "./form-edit-event.service";
import {MatInput} from "@angular/material";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input("sections") sectionList: Section[];
  @Input("formModel") form: FormModel;
  @Input('DocRef') documentRef: string;
  @ViewChild('noUnderline') input: MatInput

  formTitle = "Untitled";
  formDesc;
  maxFormMark
  id = this.documentRef;


  projectId;
  presentId;


  saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
  saveStatus = ""
  currentTotalMarks = 0
  warnMax = false

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
    this.formEditEvent.event.subscribe(next => {
      this.saveStatus = "Changes not saved"
      this.currentTotalMarks = 0
      if (this.sectionList != undefined) {
        for (let s of this.sectionList) {
          if (s.attr != undefined) {
            for (let k of s.attr) {
              if (k.maxMark != undefined)
                this.currentTotalMarks += k.maxMark
            }
          }
        }
      }

      if (this.currentTotalMarks != this.maxFormMark)
        this.warnMax = true
      else
        this.warnMax = false
    })

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

          this.saveStatus = "Saving ..."
          this.formService.saveForm(this.form, this.projectId, this.presentId).subscribe(next => {
            this.documentRef = next.id
            console.log("saved" + next.id)
            this.saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
            this.saveStatus = "Changes saved as new document"
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
      this.saveStatus = "Saving ..."
      this.formService.updateForm(this.projectId, this.presentId, this.documentRef, this.form).subscribe(next => {
        this.saveStatus = "Changes saved"

      }, error => console.log("error)"))
    }

  }

  deleteSection($event) {
    this.formEditEvent.event.emit()
    let i = 0;
    for (let sec of this.sectionList) {
      if (sec.id == $event as number) {
        this.sectionList.splice(i, 1)

      }
      i++;

    }
  }

  updateFields() {
    this.formEditEvent.event.emit()
  }

}
