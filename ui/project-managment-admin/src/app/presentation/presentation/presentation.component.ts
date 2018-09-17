import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {FormService} from "../../services/form.service";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  projectId
  originalPId;
  presentId;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService, formService: FormService) {
  }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = Number(params.id);
      console.log(params)
      this.route.params.subscribe(next => {
        this.presentId = next.id
        this.projectService.getOriginalProjectId(this.projectId)
          .subscribe(next => {
            this.originalPId = next
          })
      })


    });

  }

  createForm() {
    this.router.navigate(['/test'])
  }
}
