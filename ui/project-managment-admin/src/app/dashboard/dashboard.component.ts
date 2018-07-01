import {Component, OnInit, ViewChild} from '@angular/core';
import {AddProjectComponent} from "../shared/add-project/add-project.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('addNew') addProject: AddProjectComponent;

  constructor() { }

  ngOnInit() {
  }

  addNewProject() {
    console.log("clicked")
  }

}
