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

  //Template bindings
  @Input("sections") sectionList: Section[];
  @Input("formModel") form: FormModel;
  @Input('DocRef') documentRef: string;

  //Form attributes
  formTitle = "Untitled";
  formDesc;
  maxFormMark;
  maxFormMarkIndividual;

  //If it is existing document save the document ref
  id = this.documentRef;


  projectId;
  presentId;


  //Set button title according to state
  saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
  saveStatus = "";

  //Total current mark for form
  currentTotalMarks = 0
  //Individual totla mark
  currentTotalMarksForIndividual = 0

  //Warning if mark not match with max mark
  warnMax = false;
  warnMaxIndividual = false;

  //save Section id
  private static lastSecId = 0;

  //Marking bias
  bias = 0


  constructor(private formService: FormService,
              public formDataService: FormDataService,
              private titleBar: RenameTitleBarService,
              public formEditEvent: FormEditEventService,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    //Set the title
    this.titleBar.setTitle("Create new form")

    //If form is defined
    if (this.form != undefined) {
      this.formTitle = this.form.name;
      this.formDesc = this.form.description;
      this.id = this.form.id;
    }


    //Get current project and presentation data
    this.projectId = this.formDataService.projectId
    this.presentId = this.formDataService.presentationId

    /*
    On every changes in form total mark will be recalculated and show in page
     */
    this.formEditEvent.event.subscribe(next => {
      this.saveStatus = "Changes not saved"

      //Set current mark initially 0
      this.currentTotalMarks = 0
      this.currentTotalMarksForIndividual = 0

      //Check section list
      if (this.sectionList != undefined) {

        //Iterate all the section list
        for (let s of this.sectionList) {

          //Get the section type GROUP or individual
          if (!s.type || s.type == SectionType.GROUP) {

            //Check section have attribute list
            if (s.attr != undefined) {

              //Iterate all the attribute list
              for (let k of s.attr) {
                //Get the maximum mark if defined in that attribute
                if (k.maxMark != undefined) //then add it to the current mark
                  this.currentTotalMarks += k.maxMark
              }
            }

            //Section type is INDIVIDUAL
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

      //If max mark and current mark mismatch
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

  /**
   * New section add to form
   */
  onAddSectionClick() {
    //New section object
    let mSection = new Section();
    //set the id
    mSection.id = FormComponent.lastSecId++;
    //set the section type to group
    mSection.type = SectionType.GROUP

    //If there is no section list previous create new section lis and add that in to it
    if (this.sectionList != undefined) {
      this.sectionList.push(mSection)
    } else {
      this.sectionList = [];
      this.sectionList.push(mSection)
    }

    console.log(this.sectionList)


  }

  /**
   * Same as onAddSection but type is different
   */

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


  /**
   * Save form to firebase
   */

  onSaveFormClick() {
    // this.sectionList = this.sectionList.map((obj) => {
    //   return Object.assign({}, obj)
    // });

    // if document ref is undefined document must save as new document
    if (this.documentRef == undefined) {


      //Form to save
      this.form = {
        id: this.id,
        description: this.formDesc,
        sections: this.sectionList,
        name: this.formTitle,
        totalMarks: this.maxFormMark,
        individualMaxMark: this.maxFormMarkIndividual,
        bias: this.bias
      } as FormModel;

      //Validate data
      if (this.form.sections != undefined && this.sectionList.length > 0 &&
        this.currentTotalMarksForIndividual == this.maxFormMarkIndividual &&
        this.currentTotalMarks == this.maxFormMark
      ) {

        this.saveStatus = "Saving ..."
        this.formService.saveForm(this.form, this.projectId, this.presentId).subscribe(next => {

          //Set th new document id
          this.documentRef = next.id
          console.log("saved" + next.id)
          this.saveOrUpdateButton = this.documentRef == undefined ? "Save" : "Update"
          this.saveStatus = "Changes saved as new document"
        }, error => console.log("error)"))
      } else {
        //If data is invalid open dialog
        this.dialog.open(ConfirmationDialog, {width: '250px', height: '250px'})
      }
    } else { //There is document the previously saved
      this.updateForm()
    }

  }

  /**
   * Update form if document is exist
   */
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

  /**
   * Delete section we have created. It will remove section object fron list of sections
   * @param $event index of the list
   */
  deleteSection($event) {
    //Emmit event tha form is changed
    this.formEditEvent.event.emit()
    let i = 0;
    //Find the id and delete remove it from list
    for (let sec of this.sectionList) {
      if (sec.id == $event as number) {
        this.sectionList.splice(i, 1)

      }
      i++;

    }
  }

  /**
   * Update form field
   */
  updateFields() {
    this.formEditEvent.event.emit()
  }

}

/**
 * Dialog class
 */

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
