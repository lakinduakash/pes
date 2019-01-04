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

  tableObjects = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


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

    this.markingService.getAllPresentationIds(this.oid).subscribe(prIds => {
      this.markingService.getAllGroupMarksOfPresentation(this.oid, prIds[0]).subscribe(next => {
        let a = this.convertToTableFormat(next)
        console.log(a)
        if (a)
          this.tableObjects.push(a)
        this.tableObjects.forEach(item => {
          console.log(item.colsDef)
        })
      })

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
    }
    if (tableObject.length > 0) {
      return {dataSource: tableObject, colsDef: evalIds, group: item.group}
    }

    return null


  }


}

export const map_to_obj = (aMap => {
  const obj = {};
  aMap.forEach((v, k) => {
    obj[k] = v
  });
  return obj;
});


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
