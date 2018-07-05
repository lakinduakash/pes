import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject,
  Injector,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {AddProjectComponent} from "../shared/add-project/add-project.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {ProjectService} from "../services/project.service";
import {ProjectCard} from "../model/project-card";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('addNew') addProject: AddProjectComponent;
  componentRef: ComponentRef<AddProjectComponent>;

  projectList: ProjectCard[];
  data: number = 0;
  card = ["a", "b", "c"];
  cols = 5;

  constructor(
    public dialog: MatDialog,
    private renameTitleBar: RenameTitleBarService,
    private projectService: ProjectService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver) {

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
    this.projectList = this.projectService.getProjectList();

    console.log(this.projectList)
  }

  addNewProject() {
  }

  createDialog() {
    this.renameTitleBar.setTitle("Add Project");
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: "a"}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.renameTitleBar.setTitle("Project Dashboard");

    });

    dialogRef.componentInstance.createClick.subscribe(next => {
      this.card.push("d+" + this.data++);
      this.card.reverse();
      this.addNewProject()
    });

  }

  onAddNewProjectClick() {
    this.createDialog()
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html'
})
export class DialogOverviewExampleDialog {

  @Output() createClick = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onCreateClick() {
    this.createClick.emit()
  }


}

export class DialogData {
  name: String;
}
