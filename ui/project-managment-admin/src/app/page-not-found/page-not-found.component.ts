import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {


  constructor(ps: ProjectService) {
  }

  ngOnInit() {
  }

}
