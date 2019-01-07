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
  MatSnackBarModule,
  MatTooltipModule
} from "@angular/material";

import {DashboardCardHolderComponent} from "./dashboard-card-holder/dashboard-card-holder.component";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {AddProjectComponent} from "./add-project-card/add-project.component";
import {FormsModule} from "@angular/forms";
import {RemoveProjectDialogComponent} from "./remove-dialog/remove-project-dialog.component";
import {ComponentsModule} from "../components/components.module";
import {RouterModule, Routes} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";

const routes: Routes = [
  {path: '', component: DashboardComponent}
]
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
    FormsModule,
    MatTooltipModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,
    AddProjectComponent,
    ProjectCardComponent,
    DashboardCardHolderComponent,
    RemoveProjectDialogComponent],
  entryComponents: [RemoveProjectDialogComponent, DialogOverviewExampleDialog, ProjectCardComponent]
})
export class DashboardModule {
}
