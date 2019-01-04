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
  MatInputModule,
  MatSlideToggleModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {FormEditEventService} from "./form-edit-event.service";
import {ComponentsModule} from "../components/components.module";


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
    SharedModule,
    ComponentsModule,
    MatSlideToggleModule
  ],
  declarations: [FormComponent, SectionComponent, AttributeComponent],
  exports: [FormComponent],
  providers: [FormEditEventService]
})
export class EvalFormModule {
}
