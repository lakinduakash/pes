import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard-component/dashboard.component";
import {DialogOverviewExampleDialog} from "./add-project-dialog/add-project-dialog.component";
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    SharedModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,]
})
export class DashboardModule {
}
