import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormViewComponent } from './form-view/form-view.component';
import { SectionComponent } from './section/section.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import { AttributeComponent } from './attribute/attribute.component';

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
  declarations: [FormViewComponent, SectionComponent, AttributeComponent],
  exports:[FormViewComponent]
})
export class EvalFormParserModule {
}
