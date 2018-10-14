import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationComponent} from './presentation/presentation.component';
import {SharedModule} from "../shared/shared.module";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {EvalListComponent} from './eval-list/eval-list.component';
import {EvalAssignService} from "./services/eval-assign.service";
import {ViewFormListComponent} from "./view-form-list/view-form-list.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule,
    MatExpansionModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ComponentsModule,
  ],
  declarations: [PresentationComponent, EvalListComponent, ViewFormListComponent],
  exports: [PresentationComponent],
  entryComponents: [EvalListComponent],
  providers: [EvalAssignService]
})
export class PresentationModule {
}
