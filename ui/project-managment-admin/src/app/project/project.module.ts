import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';

import {ViewFormListComponent} from './view-form-list/view-form-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatRippleModule,
  MatSelectModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {CreatePresentationDialogComponent} from './create-presentation-dialog/create-presentation-dialog.component';
import { ViewFormListComponent } from './view-form-list/view-form-list.component';



import {MatButtonModule,
  MatCardModule,
  //MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatTooltipModule} from '@angular/material';
  import {MatDialogModule} from '@angular/material/dialog';
//import {SharedModule} from "../shared/shared.module";
import { ProjectMainComponent } from './project-main/project-main.component';
import { AddFullMarkComponent } from './add-full-mark/add-full-mark.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
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
    MatTooltipModule,
    FormsModule,
    RouterModule

  ],

  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ProjectMainComponent, AddFullMarkComponent, ViewFormListComponent]
})
export class ProjectModule {
}
