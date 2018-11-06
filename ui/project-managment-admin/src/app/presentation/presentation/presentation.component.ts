import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {FormDataService} from "../../services/form-data.service";
import {MatDialog} from "@angular/material";
import {DialogData, EvalListComponent} from "../eval-list/eval-list.component";
import {EvalAssignService} from "../services/eval-assign.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {NavBarTitleService} from "../../components/services/nav-bar-title.service";
import {PresentationControlService} from "../services/presentation-control.service";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit, OnDestroy {

  projectId
  originalPId;
  presentId;

  panelState: boolean

  onceLoaded = false;

  groupList: any[];


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

            this.presentControl.getGroupList(this.originalPId).subscribe(next => console.log(next))
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

  shareForm(event) {

    let dialogRef;

    this.evs.getAssigneeList({id: event}).pipe(
      switchMap(value => {
        if (value != undefined)
          dialogRef = this.dialog.open(EvalListComponent, {
            data: {evalList: value} as DialogData,
            panelClass: "custom-modalbox",
            width: "600px"
          });
        else
          dialogRef = this.dialog.open(EvalListComponent, {
            data: {evalList: []} as DialogData,
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
        let k = dialogRef.componentInstance.selectedMap
        let evalList = []
        k.forEach(item => evalList.push(item))
        this.evs.assignEvaluators({formId: event, evalList: evalList})

      }
    )
  }
}
