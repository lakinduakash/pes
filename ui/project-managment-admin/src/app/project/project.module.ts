import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';
import { ViewFormListComponent } from './view-form-list/view-form-list.component';
import {MatListModule} from "@angular/material";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    RouterModule
  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ViewFormListComponent]
})
export class ProjectModule {
}
