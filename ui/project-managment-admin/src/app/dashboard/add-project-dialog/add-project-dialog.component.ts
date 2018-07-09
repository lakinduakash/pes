import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Enter Project name</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Project name" [(ngModel)]="data.name">
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <textarea #inputDes matInput placeholder="Description" maxlength="50" [(ngModel)]="data.description"></textarea>
        <mat-hint align="end">{{inputDes.value?.length || 0}}/50</mat-hint>
      </mat-form-field>

    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial (click)="onCreateClick()">Create</button>
    </div>
  `
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
    console.log(this.duplicateProject);
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
