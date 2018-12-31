import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Enter presentation name</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Presentation name" [(ngModel)]="data.name" required>
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <textarea #inputDes matInput placeholder="Description" maxlength="50" [(ngModel)]="data.description"></textarea>
        <mat-hint align="end">{{inputDes.value?.length || 0}}/50</mat-hint>
      </mat-form-field>

      <mat-form-field>
        <input [formControl]="mark" type="number" matInput placeholder="Marking bias %" [(ngModel)]="data.markBias">
      </mat-form-field>


      <mat-form-field class="example-full-width">
        <input matInput [min]="minDate" [matDatepicker]="picker" placeholder="Schedule to"
               [(ngModel)]="data.scheduledDate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial (click)="onCreateClick()">Create</button>
    </div>
  `
})
export class CreatePresentationDialogComponent {

  @Output() createClick = new EventEmitter();

  @Input("duplicate") duplicateProject: boolean = false;

  minDate = new Date();

  mark = new FormControl();


  constructor(
    public dialogRef: MatDialogRef<CreatePresentationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar) {

    this.mark.setValidators([Validators.max(100), Validators.min(0), Validators.required])

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
    } else if (!this.mark.valid) {
      console.log(this.duplicateProject);
      this.snackBar.open("Percentage should be between 0 to 100", "Ok", {
        duration: 2000,
      }).onAction().subscribe((next) => this.snackBar.dismiss());
    } else {
      this.data.created = new Date()
      this.createClick.emit();
      this.dialogRef.close()
    }
  }



}

export class DialogData {
  name: string;
  description: string
  scheduledDate
  markBias
  created
}
