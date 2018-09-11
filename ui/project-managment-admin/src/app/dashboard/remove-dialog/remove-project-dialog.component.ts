import {Component, EventEmitter, Output} from "@angular/core";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'dialog-remove-project',
  template: `
    <h1 mat-dialog-title>Are you sure to delete {{projectName}}?</h1>
    <div mat-dialog-content>
      <p>Every reltated data to this project will be lost</p>

    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial (click)="onYesClick()">Delete</button>
    </div>
  `
})
export class RemoveProjectDialogComponent {

  @Output() yesClick = new EventEmitter();
  projectName = "";


  constructor(
    public dialogRef: MatDialogRef<RemoveProjectDialogComponent>) {

  }


  onNoClick(): void {
    this.dialogRef.close()
  }

  onYesClick() {

    this.yesClick.emit();
    this.dialogRef.close()
  }


}
