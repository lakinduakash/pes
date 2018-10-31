import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [SignupComponent, LoginComponent]
})
export class SignInUpModule {
}
