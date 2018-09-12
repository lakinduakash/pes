import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';

import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent]
})
export class ProjectModule {
}
