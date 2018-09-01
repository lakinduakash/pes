import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {SectionComponent} from './section/section.component';
import {AttributeComponent} from './attribute/attribute.component';
import {MatCardModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [FormComponent, SectionComponent, AttributeComponent],
  exports: [FormComponent]
})
export class EvalFormModule {
}
