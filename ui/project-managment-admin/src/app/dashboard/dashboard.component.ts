import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AddProjectComponent} from "../shared/add-project/add-project.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {ProjectService} from "../services/project.service";
import {ProjectCard} from "../model/project-card";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('addNew') addProject: AddProjectComponent;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<AddProjectComponent>;

  projectList: ProjectCard[];

  constructor(public dialog: MatDialog, private renameTitleBar: RenameTitleBarService, private projectService: ProjectService, private resolver: ComponentFactoryResolver) {
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
      this.createComponent();
      this.addNewProject()
    });

  }

  onAddNewProjectClick() {
    this.createDialog()
  }

  createComponent() {
    //this.container.clear();
    const factory: ComponentFactory<AddProjectComponent> = this.resolver.resolveComponentFactory(AddProjectComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.addProject.subscribe(next => this.onAddNewProjectClick())
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
