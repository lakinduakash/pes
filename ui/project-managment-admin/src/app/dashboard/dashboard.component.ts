import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild} from '@angular/core';
import {AddProjectComponent} from "./add-project-card/add-project.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {ProjectService} from "../services/project.service";
import {ProjectCard} from "../core/model/project-card";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DialogOverviewExampleDialog} from "./add-project-dialog/add-project-dialog.component";
import {RemoveProjectDialogComponent} from "./remove-dialog/remove-project-dialog.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate(170)
      ]),
      transition('* => void', [
        animate(120, style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  @ViewChild('addNew') addProject: AddProjectComponent;

  state = 'in1col';

  projectList: ProjectCard[];

  list: ProjectCard[] = [];

  data: number = 0;
  cols = 5;
  id = 1001;

  constructor(
    public dialog: MatDialog,
    private renameTitleBar: RenameTitleBarService,
    private projectService: ProjectService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar) {


    breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 1
      }
    });

    breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 2
      }
    });

    breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 3
      }
    });

    breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 5
      }
    });

    breakpointObserver.observe([
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 6
      }
    });
  }

  ngOnInit() {
    this.renameTitleBar.setTitle("Project Dashboard");
    this.projectService.getProjectList().subscribe(next => {
      this.projectList = next;
      this.updateList();
    })
  }

  updateList() {
    for (let a of this.projectList) {
      let needAdded: boolean = true;
      let needToRemove: boolean = false;
      for (let b of this.list) {
        if (a.id == b.id) {
          needAdded = false;
          break
        }

      }
      if (needAdded)
        this.list.push(a)
    }
  }

  addNewProject(card) {

    this.projectService.createProject(card)
  }

  createDialog() {

    this.renameTitleBar.setTitle("Add Project");
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: "", description: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.renameTitleBar.setTitle("Project Dashboard");

    });


    dialogRef.componentInstance.createClick.subscribe(next => {

      for (let entry of this.projectList) {
        if (entry.cardTitle === dialogRef.componentInstance.data.name) {
          dialogRef.componentInstance.duplicateProject = true;
          this.snackBar.open("Please choose different name", "Ok", {
            duration: 2000,
          }).onAction().subscribe((next) => this.snackBar.dismiss());
          return;
        }
      }

      let card: ProjectCard = {
        id: this.id++,
        owner: "Lakindu",
        cardTitle: dialogRef.componentInstance.data.name,
        description: dialogRef.componentInstance.data.description,
      } as ProjectCard;

      this.addNewProject(card);
      this.snackBar.open("Project created", "Dismiss", {
        duration: 2000,
      }).onAction().subscribe((next) => this.snackBar.dismiss());


    });

  }

  onAddNewProjectClick() {
    this.createDialog()
  }

  removeProject(res) {
    let i = 0;
    for (let entry of this.list) {
      if (entry.id == res)
        break;
      i++;
    }

    const dialogRef = this.dialog.open(RemoveProjectDialogComponent, {
      width: '250px'
    });

    let undoPressed: boolean = false;

    let temp = this.list[i];
    dialogRef.componentInstance.projectName = this.list[i].cardTitle;
    dialogRef.componentInstance.yesClick.subscribe(next => {
      this.list.splice(i, 1);
      this.snackBar.open(`Project ${temp.cardTitle} removed`, "Undo", {
        duration: 2000,
      }).onAction().subscribe((next) => {
          this.list.splice(i, 0, temp);
          undoPressed = true
        }, error1 => console.log(error1),
        () => {
          if (!undoPressed) this.projectService.deleteProject(temp.id)
        });
    })



  }

}



