import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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

  projectList: ProjectCard[];

  constructor(public dialog: MatDialog, private renameTitleBar: RenameTitleBarService, private projectService: ProjectService) {
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

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class DialogData {
  name: String = "a";
}
