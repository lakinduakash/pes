import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialog, FormComponent} from './form.component';
import {SectionComponent} from './section/section.component';
import {AttributeComponent} from './attribute/attribute.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
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
    MatSlideToggleModule,
    MatDialogModule
  ],
  declarations: [FormComponent, SectionComponent, AttributeComponent, ConfirmationDialog],
  exports: [FormComponent],
  providers: [FormEditEventService],
  entryComponents: [ConfirmationDialog]
})
export class EvalFormModule {
}
