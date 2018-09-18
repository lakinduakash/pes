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
import { AddFullMarkComponent } from './add-full-mark/add-full-mark.component';

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
<<<<<<< HEAD
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ProjectMainComponent, AddFullMarkComponent]
=======
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ProjectMainComponent]
    MatListModule,
    RouterModule
  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ViewFormListComponent]
>>>>>>> f7e3ba533d2a1528108ac7bf7b651d3f118467fc
})
export class ProjectModule {
}
