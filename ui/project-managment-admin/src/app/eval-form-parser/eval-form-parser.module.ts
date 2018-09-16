import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormViewComponent } from './form-view.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatOptionModule, MatSelectModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {SectionComponent} from "./section/section.component";
import {AttributeComponent} from "./attribute/attribute.component";

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
    MatOptionModule,
    MatSelectModule
  ],
  declarations: [FormViewComponent,SectionComponent,AttributeComponent],
  exports:[FormViewComponent]
})
export class EvalFormParserModule {
}
