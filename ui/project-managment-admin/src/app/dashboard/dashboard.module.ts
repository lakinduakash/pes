import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DialogOverviewExampleDialog} from "./add-project-dialog/add-project-dialog.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {DashboardCardHolderComponent} from "./dashboard-card-holder/dashboard-card-holder.component";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {AddProjectComponent} from "./add-project-card/add-project.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    SharedModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,
    AddProjectComponent,
    ProjectCardComponent,
    DashboardCardHolderComponent]
})
export class DashboardModule {
}
