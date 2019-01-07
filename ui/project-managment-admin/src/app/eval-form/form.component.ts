import {Component, Input, OnInit} from '@angular/core';
import {FormModel, Section, SectionType} from "../core/model/form-model";
import {FormService} from "../services/form.service";
import {FormDataService} from "../services/form-data.service";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {FormEditEventService} from "./form-edit-event.service";
import {MatDialog, MatDialogRef} from "@angular/material";

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
  maxFormMark;
  maxFormMarkIndividual;
  id = this.documentRef;


  projectId;
  presentId;


  saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
  saveStatus = "";
  currentTotalMarks = 0
  currentTotalMarksForIndividual = 0
  warnMax = false;
  warnMaxIndividual = false;

  private static lastSecId = 0;

  bias = 0


  constructor(private formService: FormService,
              public formDataService: FormDataService,
              private titleBar: RenameTitleBarService,
              public formEditEvent: FormEditEventService,
              public dialog: MatDialog) {
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
      this.currentTotalMarksForIndividual = 0
      if (this.sectionList != undefined) {
        for (let s of this.sectionList) {

          if (!s.type || s.type == SectionType.GROUP) {
            if (s.attr != undefined) {
              for (let k of s.attr) {
                if (k.maxMark != undefined)
                  this.currentTotalMarks += k.maxMark
              }
            }
          } else {
            if (s.attr != undefined) {
              for (let k of s.attr) {
                if (k.maxMark != undefined)
                  this.currentTotalMarksForIndividual += k.maxMark
              }
            }
          }
        }
      }

      if (this.currentTotalMarks != this.maxFormMark)
        this.warnMax = true
      else
        this.warnMax = false

      if (this.currentTotalMarksForIndividual != this.maxFormMarkIndividual)
        this.warnMaxIndividual = true
      else
        this.warnMaxIndividual = false
    })

  }

  onAddSectionClick() {
    let mSection = new Section();
    mSection.id = FormComponent.lastSecId++;
    mSection.type = SectionType.GROUP

    if (this.sectionList != undefined) {
      this.sectionList.push(mSection)
    }
    else {
      this.sectionList = [];
      this.sectionList.push(mSection)
    }

    console.log(this.sectionList)


  }


  onAddIndividualSectionClick() {
    let mSection = new Section();
    mSection.type = SectionType.INDIVIDUAL
    mSection.id = FormComponent.lastSecId++;

    if (this.sectionList != undefined) {
      this.sectionList.push(mSection)
    } else {
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
          name: this.formTitle,
          totalMarks: this.maxFormMark,
          individualMaxMark: this.maxFormMarkIndividual,
          bias: this.bias
        } as FormModel;

        if (this.form.sections != undefined && this.sectionList.length > 0 &&
          this.currentTotalMarksForIndividual == this.maxFormMarkIndividual &&
          this.currentTotalMarks == this.maxFormMark
        ) {

          this.saveStatus = "Saving ..."
          this.formService.saveForm(this.form, this.projectId, this.presentId).subscribe(next => {
            this.documentRef = next.id
            console.log("saved" + next.id)
            this.saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
            this.saveStatus = "Changes saved as new document"
          }, error => console.log("error)"))
        }
        else {
          this.dialog.open(ConfirmationDialog, {width: '250px', height: '250px'})
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


// @ts-ignore
@Component({
  selector: 'app-c-dialog',
  template: `
    <h1 mat-dialog-title>Invalid data</h1>
    <div mat-dialog-content>
      Some data are invalid, please check again before save
    </div>

    <div mat-dialog-actions>
      <button mat-button cdkFocusInitial (click)="onNoClick()">Cancel</button>
    </div>
  `
})

export class ConfirmationDialog implements OnInit {

  yesClicked = false;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {

  }


  ngOnInit(): void {
  }

  onYesClick() {
    this.yesClicked = true;
    this.dialogRef.close()
  }

  onNoClick() {
    this.dialogRef.close()
  }


}
