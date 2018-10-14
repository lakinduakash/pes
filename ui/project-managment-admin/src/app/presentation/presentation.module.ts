import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationComponent} from './presentation/presentation.component';
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
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {EvalListComponent} from './eval-list/eval-list.component';
import {EvalAssignService} from "./services/eval-assign.service";
import {ViewFormListComponent} from "./view-form-list/view-form-list.component";
import {FormViewContainerComponent} from './form-view-container/form-view-container.component';
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {
    path: ':id',
    children: [
      {path: '', component: PresentationComponent, canActivate: [AuthGuard]}
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    RouterModule.forChild(routes),
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
  declarations: [PresentationComponent, EvalListComponent, ViewFormListComponent, FormViewContainerComponent],
  exports: [PresentationComponent],
  entryComponents: [EvalListComponent],
  providers: [EvalAssignService]
})
export class PresentationModule {
}
