import {Component, OnInit} from '@angular/core';
import {GroupMarkPresentation, MarkingService} from "../services/marking-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-marking-view',
  templateUrl: './marking-view.component.html',
  styleUrls: ['./marking-view.component.css']
})
export class MarkingViewComponent implements OnInit {

  oid

  constructor(public markingService: MarkingService, public router: ActivatedRoute, public projectService: ProjectService, public route: Router) {
    this.router.params.subscribe(param => {
      this.oid = param.oid
      this.projectService.isProjectExist(undefined, param.oid).subscribe(exist => {
        if (!exist) {
          this.route.navigate(['notfoundproject'])
        }
      })
    })
  }

  marks = []

  ngOnInit() {

    this.markingService.getAllPresentationIds(this.oid).subscribe(next => console.log(next))
  }


  convertToTableFormat(item: GroupMarkPresentation) {
    let groupMembers: string[];
    let tableObject = []

    if (item.forms && item.forms[0]) {
      groupMembers = Object.keys(item.forms[0].individualMarkMap)
    }

    if (groupMembers) {

      groupMembers.forEach(mem => {
        let obj = {}
        item.forms.forEach(form => {
          let key = form.assign.email;
          obj = {...obj, ...{key: form.individualMarkMap[mem]}}
        });

        tableObject.push(obj)
      })
    }
    console.log(tableObject)

  }

}
