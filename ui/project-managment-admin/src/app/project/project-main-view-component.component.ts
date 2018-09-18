import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {CreatePresentationDialogComponent} from "./create-presentation-dialog/create-presentation-dialog.component";
import {PresentationService} from "../services/presentation.service";
import {Presentation} from "../core/model/presentation";
import {ProjectService} from "../services/project.service";
import {RenameTitleBarService} from "../services/rename-title-bar.service";

@Component({
  selector: 'app-project-main-view-component',
  templateUrl: './project-main-view-component.component.html',
  styleUrls: ['./project-main-view-component.component.css']
})
export class ProjectMainViewComponentComponent implements OnInit {

  id: string;
  presentationList: PresentationData[] = []

  showPage = false

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private presentationService: PresentationService,
              private projectService: ProjectService,
              private titleBar: RenameTitleBarService) {

    this.route.paramMap.subscribe(next => {
      this.id = next.get('id')
      this.projectService.isProjectExist(Number(this.id)).subscribe(
        next => {
          if (!next) {
            this.router.navigate(['noProjectFound'])
          }
          else {
            this.showPage = true
          }
        }
      )

    })


  }

  ngOnInit() {


    this.titleBar.setTitle("Projects")

    this.presentationService.getPresentation(Number(this.id)).subscribe(
      next => {
        this.presentationList = []
        next.docs.forEach(
          item => this.presentationList.push({
            id: item.id,
            name: item.data().name,
            description: item.data().description
          })
        )
      }
    )


    this.presentationService.getPresentationList(Number(this.id)).subscribe(
      next => {
        next.docs.forEach(
          item => {
            this.updateList(item)


          }
        )
      }
    )


  }

  addPresentation(){
    console.log(this.id);

    const dialogRef = this.dialog.open(CreatePresentationDialogComponent, {
      width: '250px',
      panelClass:'custom-modalbox',
      data: {name: "", description: ""}
    });

    dialogRef.componentInstance.createClick.subscribe(
      next=>
      {
          this.presentationService.addPresentation(Number(this.id),{name:dialogRef.componentInstance.data.name,description:dialogRef.componentInstance.data.description} as Presentation).subscribe(next => console.log(this.presentationList))

      }
    )


  }

  updateList(item) {
    if (this.presentationList.length > 0) {
      let canBeAdded: boolean = true
      for (let i of this.presentationList) {
        if (i.id == item.id) {
          canBeAdded = false
        }
      }

      if (canBeAdded)
        this.presentationList.push({id: item.id, name: item.data().name, description: item.data().description})
    }
    else {
      this.presentationList.push({id: item.id, name: item.data().name, description: item.data().description})
    }
  }

}

interface PresentationData {
  id: string
  name: string
  description?: string

}
