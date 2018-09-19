import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMarksComponent } from './view-marks/view-marks.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  declarations: [ViewMarksComponent]
})
export class ViewMarksMModule { }
