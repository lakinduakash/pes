import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {FormDataService} from "../../services/form-data.service";
import {MatDialog, MatDialogRef, MatSelect} from "@angular/material";
import {DialogData, EvalListComponent} from "../eval-list/eval-list.component";
import {EvalAssignService} from "../services/eval-assign.service";
import {mapTo, switchMap} from "rxjs/operators";
import {interval, of, Subscription} from "rxjs";
import {NavBarTitleService} from "../../components/services/nav-bar-title.service";
import {PresentationControlService} from "../services/presentation-control.service";
import {STATES} from "../../core/model/prsentation-control";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit, OnDestroy {

  @ViewChild('matSelect') groupSelect: MatSelect;

  projectId;
  originalPId;
  presentId;

  //Expansion panel opened
  panelState: boolean;

  onceLoaded = false;

  //List of groups
  groupList: any[];

  submittedEvals = []

  groupListForSelect: GroupListItem[] = [];

  //State tha shown in presentation control panenl
  stateTitle = "No operations"

  //Buttons disabled status
  disabledPauseButton = true;
  disabledCancelButton = true;
  disabledStartButton = true;
  disabledGroupSelect = true;

  //Current presentation state
  presentationState = STATES.finished;

  //Selected group that evaluating now
  selectedGroup

  finishedList = [];

  //Timer source
  source = interval(1000)

  timeSub: Subscription
  time = '';

  timeMin = 0
  timeSec = 0

  //Presentation id and projectId loaded
  pLoaded = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              public formDataService: FormDataService,
              private titleBar: NavBarTitleService,
              private dialog: MatDialog,
              private evs: EvalAssignService,
              public presentControl: PresentationControlService) {
  }

  ngOnInit() {
    //Set the title bar
    this.titleBar.setTitle("Presentation")

    //Get route parameters
    this.route.parent.parent.params.subscribe(params => {

      //Get simplified project id
      this.projectId = Number(params.id);
      console.log(params)
      //then Get presentation id
      this.route.params.subscribe(next => {

        //Assign id to global variable
        this.presentId = next.id

        //Get original project doc id from simplified id
        this.projectService.getOriginalProjectId(this.projectId)
          .subscribe(next => {
            //Assign project id id
            this.originalPId = next

            //Update values in form data service
            this.formDataService.presentationId = this.presentId;
            this.formDataService.projectId = this.originalPId;

            //Now loaded the presentation id and project id
            this.pLoaded = true;

            //Get group list from and assign it
            this.presentControl.getGroupList(this.originalPId).subscribe(next => this.groupList = next)

            this.presentControl.getFinishedList(this.originalPId, this.presentId).subscribe(next => this.finishedList = next)

            //Fetch realtime states and listen for changes
            this.presentControl.getRealTimeStates(this.originalPId, this.presentId).subscribe(
              next => {
                console.log(next.currentState)
                //Check there is no state is saved
                if (next.currentGroup == undefined || next.currentGroup == '') {
                  //Set states of buttons
                  this.setButtonStates(this.presentationState, false)

                }
                else {
                  //If there is a state saved
                  if (next.currentState != undefined) {

                    this.setButtonStates(next.currentState, this.isValidGroupSelected(next.currentGroup), "group " + next.currentGroup);
                    this.selectedGroup = next.currentGroup
                    this.presentationState = next.currentState
                  }
                }


                //Timer object
                //Get previously saved started time
                let tiSub = this.presentControl.getStartedTime(this.originalPId, this.presentId).pipe(switchMap(
                  //Set start value to timer
                  next => interval(1000).pipe(mapTo(next))
                  )
                )

                //If presentation state is not stopped and finished and time subject have undefined or not started then start it
                if (this.presentationState != 2 && this.presentationState != 3 && (this.timeSub == undefined || this.timeSub.closed)) {

                  //Start the timer
                  this.timeSub = tiSub.subscribe(val => {
                    {
                      let b = val
                      //Get current date
                      let a = Date.now();
                      //Get the total seconds from starting point
                      let totalSecs = Math.trunc(a / 1000 - b.seconds)

                      //Get the minutes count
                      let minutes = Math.floor(totalSecs / 60);
                      //Get the rest of seconds
                      let seconds = totalSecs % 60;

                      //Set timer value in ui
                      this.timeMin = minutes
                      this.timeSec = seconds

                      this.time = ' ' + minutes + " minutes " + seconds + ' seconds '
                    }
                  })

                }

                //Get the submission status who have submitted the evaluation form for selected group and add it to list, Then show it in the ui
                this.presentControl.getSubmissionStatus(this.originalPId, this.presentId, 'group ' + next.currentGroup).subscribe(item => {
                  this.submittedEvals = [];
                  item.forEach(val => this.submittedEvals.push(val.payload.doc.data().assign))
                })

              }
            )


          })
      })


    });


  }

  /**
   * Navigate user to create form
   */
  createForm() {

    this.router.navigate(['/create-form'])
  }


  ngOnDestroy(): void {
  }

  panelStateOpen() {
    this.panelState = true
    this.onceLoaded = true
  }

  panelStateClose() {
    this.panelState = false
  }

  /**
   * Assign form to evaluator
   * @param formId
   */
  shareForm(formId) {

    let dialogRef: MatDialogRef<EvalListComponent>;

    let oldEval;

    //Get assignee list of that form id (Only one assignee in new version)
    this.evs.getAssignee(formId).pipe(
      switchMap(value => {

        //Send that data to opening dialog
        oldEval = {evaluator: value, formId: formId}
        if (value != undefined)
          dialogRef = this.dialog.open(EvalListComponent, {
            data: {eval: value} as DialogData,
            panelClass: "custom-modalbox",
            width: "600px"
          });
        else
        //If no assignee have assigned
          dialogRef = this.dialog.open(EvalListComponent, {
            data: {eval: {displayName: 'None'}} as DialogData,
            panelClass: "custom-modalbox",
            width: "600px"
          });
        return of(dialogRef)
      }),
      switchMap(
        value => {
          return dialogRef.componentInstance.onAssign

        }
      )
    ).subscribe(
      next => {
        let k = dialogRef.componentInstance.selectedEval
        this.evs.assignEvaluators({formId: formId, evaluator: k}, oldEval)

      }
    )
  }


  /**
   * Method to execute when play button clicked
   * This will execute all the needed methods to execute (Such as database operations)
   */
  startPresentation() {
    if (this.isValidGroupSelected(this.selectedGroup)) {

      if (this.presentationState != STATES.paused)
        this.presentControl.setStartedTime(this.originalPId, this.presentId)
      this.presentControl.setStates(STATES.running, this.selectedGroup, this.originalPId, this.presentId, this.projectId)
      this.setButtonStates(STATES.running, true, "group" + this.selectedGroup)
      this.presentationState = STATES.running
    }

  }

  /**
   * Method to execute when pause button clicked
   *
   */
  pausePresentation() {
    this.presentControl.setStates(STATES.paused, this.selectedGroup, this.originalPId, this.presentId, this.projectId)
    this.setButtonStates(STATES.paused, true, "group" + this.selectedGroup)
    this.presentationState = STATES.paused
  }

  /**
   * Method to execute when stop button clicked
   *
   */

  cancelPresentation() {

    this.presentControl.setStates(STATES.suspended, this.selectedGroup, this.originalPId, this.presentId, this.projectId)
    this.setButtonStates(STATES.suspended, true, "group" + this.selectedGroup)
    this.time = '';
    this.timeMin = 0
    this.timeSec = 0
    this.presentationState = STATES.suspended
    this.timeSub.unsubscribe()

  }


  finishPresentation() {

  }

  /**
   * On group selected
   * @param event
   */
  selectionChange(event) {
    this.selectedGroup = event.value;
    this.disabledStartButton = false
  }

  /**
   * Control all the button states (disabled or enabled)
   * @param state
   * @param validGroupSelected
   * @param group
   */
  setButtonStates(state: STATES, validGroupSelected, group?) {
    if (validGroupSelected) {

      switch (state) {

        case STATES.finished: {
          this.stateTitle = "No presentation is running, start new"
          this.disabledStartButton = false;
          this.disabledPauseButton = true;
          this.disabledCancelButton = true;
          this.disabledGroupSelect = false;
          break
        }

        case STATES.running: {
          this.stateTitle = "Running presentation " + group
          this.disabledStartButton = true;
          this.disabledPauseButton = false;
          this.disabledCancelButton = false;
          this.disabledGroupSelect = true;
          break
        }

        case STATES.paused: {
          this.stateTitle = "Paused presentation " + group
          this.disabledStartButton = false;
          this.disabledPauseButton = true;
          this.disabledCancelButton = false;
          this.disabledGroupSelect = true;
          break
        }
        case STATES.suspended: {
          this.stateTitle = "Stopped presentation on " + group
          this.disabledStartButton = false;
          this.disabledPauseButton = true;
          this.disabledCancelButton = true;
          this.disabledGroupSelect = false;
        }

      }

    } else {
      this.disabledStartButton = true;
      this.disabledPauseButton = true;
      this.disabledCancelButton = true;
      this.disabledGroupSelect = false;
    }
  }

  /**
   * Check valid group selected
   * @param groupId
   */
  isValidGroupSelected(groupId) {
    if (groupId == undefined || groupId === '')
      return false;

    return !this.finishedList.find(next => groupId == next);
  }

  //Not used
  initGroupList(groupList, finishedList) {
    this.groupListForSelect = [];
    for (let i of groupList) {
      for (let k of finishedList) {
        if (i === k)
          this.groupListForSelect.push({groupId: i, disabled: true, status: 'finished'})
        else
          this.groupListForSelect.push({groupId: i, disabled: false})
      }
    }
  }


}

export interface CurStateAndGroup {
  currentState?: STATES
  currentGroup?

}

interface GroupListItem {
  groupId
  status?
  disabled?

}
