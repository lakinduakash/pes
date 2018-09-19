import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'hammerjs';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {RenameTitleBarService} from "./services/rename-title-bar.service";
import {ProjectService} from "./services/project.service";
import {ProjectCardComponent} from "./dashboard/project-card/project-card.component";
import {AddProjectComponent} from "./dashboard/add-project-card/add-project.component";
import {DialogOverviewExampleDialog} from "./dashboard/add-project-dialog/add-project-dialog.component";
import {DashboardModule} from "./dashboard/dashboard.module";

import {environment} from "../environments/environment";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignupComponent} from './signup/signup.component';
import {ProjectModule} from "./project/project.module";
import {TestComponent} from './test/test.component';
import {EvalFormModule} from "./eval-form/eval-form.module";
<<<<<<< HEAD
import { ViewMarksComponent } from './view-marks-m/view-marks/view-marks.component';
=======
import {NgDragDropModule} from "ng-drag-drop";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule
} from "@angular/material";
import {EvalFormParserModule} from "./eval-form-parser/eval-form-parser.module";


import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/auth.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PresentationModule} from "./presentation/presentation.module";
import {FormDataService} from "./services/form-data.service";

>>>>>>> e7caa4c67fd6308bdaa4b426be9952a604b65e16

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    TestComponent,
    ViewMarksComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase, 'myApp'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ProjectModule,
    EvalFormModule,
    EvalFormParserModule,
    NgDragDropModule.forRoot(),
    AuthModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatProgressBarModule,
    PresentationModule



  ],
  providers: [
    RenameTitleBarService, ProjectService, AngularFireDatabase, AngularFirestore, AuthGuard, FormDataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, ProjectCardComponent, AddProjectComponent]
})
export class AppModule {
}
