import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponentComponent} from './form-component.component';
import {SectionComponent} from './section/section.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormComponentComponent, SectionComponent]
})
export class EvalFormModule {
}
