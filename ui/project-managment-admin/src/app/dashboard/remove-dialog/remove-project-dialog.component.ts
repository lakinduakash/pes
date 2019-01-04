import {Component, EventEmitter, Output} from "@angular/core";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'dialog-remove-project',
  templateUrl: './remove-project-dialog.component.html'
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
