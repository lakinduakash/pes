import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialog, ProjectMainViewComponentComponent} from './project-main-view-component.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreatePresentationDialogComponent} from './create-presentation-dialog/create-presentation-dialog.component';
import {ComponentsModule} from "../components/components.module";
import {AuthGuard} from "../auth/auth.guard";
import {StudentTableComponent} from './student-table/student-table.component';
import {PersonValidatorService} from "./services/person-validator.service";
import {FlexLayoutModule} from "@angular/flex-layout";

const routes: Routes = [{
  path: ':id',
  children:
    [
      {path: '', component: ProjectMainViewComponentComponent, canActivate: [AuthGuard]},
      {path: 'students', component: StudentTableComponent, canActivate: [AuthGuard]},
      {
        path: 'presentation', loadChildren: '../presentation/presentation.module#PresentationModule'
      },

    ]
},]

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ComponentsModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FlexLayoutModule

  ],
  declarations: [ProjectMainViewComponentComponent, CreatePresentationDialogComponent, StudentTableComponent, ConfirmationDialog],
  exports: []
  ,
  entryComponents: [CreatePresentationDialogComponent, ConfirmationDialog],
  providers: [PersonValidatorService]
})
export class ProjectModule {
}
