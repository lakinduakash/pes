import {Component, EventEmitter, Inject, Output} from "@angular/core";
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
        <textarea matInput placeholder="Description" [(ngModel)]="data.description"></textarea>
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

  isEmpty = false;



  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar) {

  }


  onNoClick(): void {
    this.dialogRef.close()
  }

  onCreateClick() {
    if (this.data.name === ("".trim())) {
      this.isEmpty = true;
      this.snackBar.open("Name is required", "Ok", {
        duration: 2000,
      }).onAction().subscribe((next) => this.snackBar.dismiss());
    }
    else {
      this.isEmpty = false;
      this.createClick.emit();
      this.dialogRef.close()
    }

    console.log(this.isEmpty)
  }



}

export class DialogData {
  name: string;
  description: string
}
