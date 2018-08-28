import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-project-main-view-component',
  templateUrl: './project-main-view-component.component.html',
  styleUrls: ['./project-main-view-component.component.css']
})
export class ProjectMainViewComponentComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log("hello");
    this.route.paramMap.subscribe(next => this.id = next.get('id'))


  }

}
