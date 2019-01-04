import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: `./add-project-dialog.component.html`
})
export class DialogOverviewExampleDialog {

  @Output() createClick = new EventEmitter();

  @Input("duplicate") duplicateProject: boolean = false;




  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar) {


  }


  onNoClick(): void {
    this.dialogRef.close()
  }

  onCreateClick() {
    if (this.data.name === ("".trim())) {
      this.snackBar.open("Name is required", "Ok", {
        duration: 2000,
      }).onAction().subscribe((next) => this.snackBar.dismiss());
    }
    else if (this.duplicateProject) {
      console.log(this.duplicateProject);
      this.snackBar.open("Please choose different name", "Ok", {
        duration: 2000,
      }).onAction().subscribe((next) => this.snackBar.dismiss());
    }

    else {
      this.createClick.emit();
      this.dialogRef.close()
    }
  }



}

export class DialogData {
  name: string;
  description: string
}
