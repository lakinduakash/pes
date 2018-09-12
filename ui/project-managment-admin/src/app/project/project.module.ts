import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';
import { ProjectMainComponent } from './project-main/project-main.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, ProjectMainComponent]
})
export class ProjectModule {
}
