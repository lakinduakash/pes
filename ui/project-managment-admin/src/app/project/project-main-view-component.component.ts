import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {CreatePresentationDialogComponent} from "./create-presentation-dialog/create-presentation-dialog.component";
import {PresentationService} from "../services/presentation.service";
import {Presentation} from "../core/model/presentation";

@Component({
  selector: 'app-project-main-view-component',
  templateUrl: './project-main-view-component.component.html',
  styleUrls: ['./project-main-view-component.component.css']
})
export class ProjectMainViewComponentComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private presentationService:PresentationService) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(next => this.id = next.get('id'))


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
          this.presentationService.addPresentation(Number(this.id),{name:dialogRef.componentInstance.data.name,description:dialogRef.componentInstance.data.description} as Presentation).
          subscribe(next=>console.log(next))

      }
    )


  }

}
