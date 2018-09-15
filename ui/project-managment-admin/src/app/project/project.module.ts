import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';
import { ViewFormListComponent } from './view-form-list/view-form-list.component';
import {MatListModule} from "@angular/material";
import {RouterModule} from "@angular/router";


import {MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatTooltipModule} from '@angular/material';
//import {SharedModule} from "../shared/shared.module";
import { ProjectMainComponent } from './project-main/project-main.component';

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
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ProjectMainComponent]
    MatListModule,
    RouterModule
  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ViewFormListComponent]
})
export class ProjectModule {
}
