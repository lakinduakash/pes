import {Component, OnInit} from '@angular/core';
import {GroupMarkPresentation, MarkingService} from "../services/marking-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {PresentationService} from "../../services/presentation.service";

@Component({
  selector: 'app-marking-view',
  templateUrl: './marking-view.component.html',
  styleUrls: ['./marking-view.component.css']
})
export class MarkingViewComponent implements OnInit {

  oid

  tableObjects = []

  presentations = []


  constructor(public markingService: MarkingService,
              public router: ActivatedRoute,
              public projectService: ProjectService,
              public route: Router,
              public presentationService: PresentationService) {

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

    this.markingService.getAllPresentationIds(this.oid).subscribe(prIds => {

      prIds.forEach(id => {
          this.presentationService.getPresentationByOriginalProjectId(this.oid, id).subscribe(next => {
            this.presentations.push({name: next.name, id: id})
          })
        }
      )


    })
  }


  convertToTableFormat(item: GroupMarkPresentation) {
    let groupMembers: string[];
    let tableObject = [];

    let evalIds = ['stuId'];

    item.forms.forEach(form => evalIds.push(form.assign.email))


    if (item.forms && item.forms[0]) {
      groupMembers = Object.keys(item.forms[0].individualMarkMap)
    }

    if (groupMembers) {

      groupMembers.forEach(mem => {
        let m = new Map()
        m.set('stuId', mem);

        item.forms.forEach(form => {
          m.set(form.assign.email, form.individualMarkMap[mem])

        });
        let ob = map_to_obj(m)
        tableObject.push(ob)
      })

      let m = new Map()
      m.set('stuId', 'Group Mark');

      item.forms.forEach(form => {
        m.set(form.assign.email, form.currentMark)

      });
      let ob = map_to_obj(m)
      tableObject.push(ob)
    }
    if (tableObject.length > 0) {
      return {dataSource: tableObject, colsDef: evalIds, group: item.group}
    }

    return null


  }

  tabChange(index) {

    this.tableObjects = [];
    this.markingService.getAllGroupMarksOfPresentation(this.oid, this.presentations[index].id).subscribe(next => {
      let a = this.convertToTableFormat(next)
      console.log(a)
      if (a)
        this.tableObjects.push(a)
      this.tableObjects.forEach(item => {
        console.log(item.colsDef)
      })
    })

  }


}

export const map_to_obj = (aMap => {
  const obj = {};
  aMap.forEach((v, k) => {
    obj[k] = v
  });
  return obj;
});

