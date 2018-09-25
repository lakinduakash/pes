import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {SectionComponent} from './section/section.component';
import {AttributeComponent} from './attribute/attribute.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {FormEditEventService} from "./form-edit-event.service";
import { AddEvaluatorComponent } from './add-evaluator/add-evaluator.component';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  declarations: [FormComponent, SectionComponent, AttributeComponent, AddEvaluatorComponent],
  exports: [FormComponent]
})
export class EvalFormModule {
}
