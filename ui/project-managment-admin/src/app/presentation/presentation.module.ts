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
  MatRippleModule,
  MatSelectModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ProjectModule} from "../project/project.module";
import {ComponentsModule} from "../components/components.module";
import {EvalListComponent} from './eval-list/eval-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    RouterModule,
    SharedModule,
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
    ProjectModule,
    ComponentsModule
  ],
  declarations: [PresentationComponent, EvalListComponent],
  exports: [PresentationComponent]
})
export class PresentationModule {
}
