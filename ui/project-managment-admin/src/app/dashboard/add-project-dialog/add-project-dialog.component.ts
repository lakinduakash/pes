import {Component, EventEmitter, Inject, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Enter Project name</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Project name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial (click)="onCreateClick()">Create</button>
    </div>
  `
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
