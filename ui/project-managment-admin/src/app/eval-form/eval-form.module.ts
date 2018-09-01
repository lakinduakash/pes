import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponentComponent} from './form-component.component';
import {SectionComponent} from './section/section.component';
import {SectionComponentComponent} from './section-component/section-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormComponentComponent, SectionComponent, SectionComponentComponent]
})
export class EvalFormModule {
}
