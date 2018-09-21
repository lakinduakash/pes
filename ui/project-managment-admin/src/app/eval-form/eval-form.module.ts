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
} from '@angular/material';
import {FormsModule} from '@angular/forms';

import { AddEvaluatorComponent } from './add-evaluator/add-evaluator.component';
//import {NgDragDropModule} from 'ng-drag-drop';


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
    //NgDragDropModule
  ],
  declarations: [FormComponent, SectionComponent, AttributeComponent, AddEvaluatorComponent],
  exports: [FormComponent]
})
export class EvalFormModule {
}
