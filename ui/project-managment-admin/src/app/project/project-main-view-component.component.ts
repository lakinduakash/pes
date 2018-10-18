import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatSnackBar} from "@angular/material";
import {CreatePresentationDialogComponent} from "./create-presentation-dialog/create-presentation-dialog.component";
import {PresentationService} from "../services/presentation.service";
import {Presentation} from "../core/model/presentation";
import {ProjectService} from "../services/project.service";
import {Subscription} from "rxjs";
import * as csvJson from "csvjson";
import {NavBarTitleService} from "../components/services/nav-bar-title.service";
import * as tableify from "tableify"


@Component({
  selector: 'app-project-main-view-component',
  templateUrl: './project-main-view-component.component.html',
  styleUrls: ['./project-main-view-component.component.css']
})
export class ProjectMainViewComponentComponent implements OnInit, OnDestroy {

  id: string;
  presentationList: PresentationData[] = []


  showPage = false

  routS: Subscription
  pexS: Subscription

  @ViewChild('file') file;

  public files: Set<File> = new Set();

  fileName = ""


  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private presentationService: PresentationService,
              private projectService: ProjectService,
              private titleBar: NavBarTitleService,
              private snackBar: MatSnackBar,
              private render: Renderer2) {

    this.routS = this.route.paramMap.subscribe(next => {
      this.id = next.get('id')
      console.log(this.id)
      this.pexS = this.projectService.isProjectExist(Number(this.id)).subscribe(
        next => {
          console.log(next)
          if (!next) {
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

  ngOnDestroy(): void {

    this.routS.unsubscribe()
    this.pexS.unsubscribe()
  }

  openCreateForm() {

  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {

        this.files.add(files[key]);

        let options = {
          delimiter: ',', // optional
          quote: '"' // optional
        };

        let fileReader = new FileReader();

        fileReader.onload = (e) => {

          let a = csvJson.toObject(fileReader.result, options);


          this.snackBar.open("File uploaded", "Dismiss", {
            duration: 2000,
          }).onAction().subscribe((next) => this.snackBar.dismiss());
          console.log(a)
          let table = tableify(a)

        };

        fileReader.readAsText(files[0])
        this.fileName = files[0].name


      }

    }
  }


  clickAddFiles() {
    this.file.nativeElement.click()
  }



}



interface PresentationData {
  id: string
  name: string
  description?: string

}
