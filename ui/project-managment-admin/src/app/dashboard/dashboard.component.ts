import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AddProjectComponent} from "../shared/add-project/add-project.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {RenameTitleBarService} from "../services/rename-title-bar.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('addNew') addProject: AddProjectComponent;

  constructor(public dialog: MatDialog, private renameTitleBar: RenameTitleBarService) {
  }

  ngOnInit() {
    this.renameTitleBar.setTitle("Project Dashboard");
  }

  addNewProject() {
    this.renameTitleBar.setTitle("Project Dashboard");
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: "a"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

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
