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

  panelState: boolean;

  onceLoaded = false;

  groupList: any[];

  groupListForSelect: GroupListItem[] = [];

  stateTitle = "No operations"

  disabledPauseButton = true;
  disabledCancelButton = true;
  disabledStartButton = true;
  disabledGroupSelect = true;

  presentationState = STATES.finished;

  selectedGroup

  finishedList = [];

  source = interval(1000)

  timeSub: Subscription
  time = ''


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
    this.titleBar.setTitle("Presentation")
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = Number(params.id);
      console.log(params)
      this.route.params.subscribe(next => {
        this.presentId = next.id
        this.projectService.getOriginalProjectId(this.projectId)
          .subscribe(next => {
            this.originalPId = next

            this.formDataService.presentationId = this.presentId;
            this.formDataService.projectId = this.originalPId;

            this.presentControl.getGroupList(this.originalPId).subscribe(next => this.groupList = next)
            this.presentControl.getFinishedList(this.originalPId, this.presentId).subscribe(next => this.finishedList = next)
            this.presentControl.getRealTimeStates(this.originalPId, this.presentId).subscribe(
              next => {
                console.log(next.currentState)
                if (next.currentGroup == undefined || next.currentGroup == '') {
                  this.setButtonStates(this.presentationState, false)

                }
                else {
                  if (next.currentState != undefined) {
                    this.setButtonStates(next.currentState, this.isValidGroupSelected(next.currentGroup), "group " + next.currentGroup);
                    this.selectedGroup = next.currentGroup
                    this.presentationState = next.currentState
                  }
                }


                let tiSub = this.presentControl.getStartedTime(this.originalPId, this.presentId).pipe(switchMap(
                  next => interval(1000).pipe(mapTo(next))
                  )
                )

                if (this.presentationState != 2 && this.presentationState != 3 && (this.timeSub == undefined || this.timeSub.closed)) {


                  this.timeSub = tiSub.subscribe(val => {
                    {
                      let b = val
                      let a = Date.now();
                      let totalSecs = Math.trunc(a / 1000 - b.seconds)

                      let minutes = Math.floor(totalSecs / 60);
                      let seconds = totalSecs % 60;

                      this.time = ' ' + minutes + " minutes " + seconds + ' seconds '
                    }
                  })

                }


              }
            )



          })
      })


    });


  }

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

  shareForm(formId) {

    let dialogRef: MatDialogRef<EvalListComponent>;

    this.evs.getAssignee(formId).pipe(
      switchMap(value => {
        if (value != undefined)
          dialogRef = this.dialog.open(EvalListComponent, {
            data: {eval: value} as DialogData,
            panelClass: "custom-modalbox",
            width: "600px"
          });
        else
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
        this.evs.assignEvaluators({formId: formId, eval: k})

      }
    )
  }


  startPresentation() {
    if (this.isValidGroupSelected(this.selectedGroup)) {

      if (this.presentationState != STATES.paused)
        this.presentControl.setStartedTime(this.originalPId, this.presentId)
      this.presentControl.setStates(STATES.running, this.selectedGroup, this.originalPId, this.presentId)
      this.setButtonStates(STATES.running, true, "group" + this.selectedGroup)
      this.presentationState = STATES.running
    }

  }

  pausePresentation() {
    this.presentControl.setStates(STATES.paused, this.selectedGroup, this.originalPId, this.presentId)
    this.setButtonStates(STATES.paused, true, "group" + this.selectedGroup)
    this.presentationState = STATES.paused
  }

  cancelPresentation() {

    this.presentControl.setStates(STATES.suspended, this.selectedGroup, this.originalPId, this.presentId)
    this.setButtonStates(STATES.suspended, true, "group" + this.selectedGroup)
    this.time = ''
    this.presentationState = STATES.suspended
    this.timeSub.unsubscribe()

  }

  finishPresentation() {

  }


  selectionChange(event) {
    this.selectedGroup = event.value;
    this.disabledStartButton = false
  }

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
          this.stateTitle = "Canceled presentation on " + group
          this.disabledStartButton = false;
          this.disabledPauseButton = true;
          this.disabledCancelButton = true;
          this.disabledGroupSelect = false;
        }

      }

    }
    else {
      this.disabledStartButton = true;
      this.disabledPauseButton = true;
      this.disabledCancelButton = true;
      this.disabledGroupSelect = false;
    }
  }

  isValidGroupSelected(groupId) {
    if (groupId == undefined || groupId === '')
      return false;

    return !this.finishedList.find(next => groupId == next);
  }

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
