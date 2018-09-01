import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {SectionComponent} from './section/section.component';
import {AttributeComponent} from './attribute/attribute.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormComponent, SectionComponent, AttributeComponent]
})
export class EvalFormModule {
}
