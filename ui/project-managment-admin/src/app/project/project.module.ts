import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';
import { ViewFormListComponent } from './view-form-list/view-form-list.component';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule, MatOptionModule,
  MatRippleModule, MatSelectModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule
  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ViewFormListComponent]
})
export class ProjectModule {
}
