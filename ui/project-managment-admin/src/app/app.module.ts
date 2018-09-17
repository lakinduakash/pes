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
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFirestore, AngularFirestoreModule} from "angularfire2/firestore";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {SignupComponent} from './signup/signup.component';
import {ProjectModule} from "./project/project.module";
import {TestComponent} from './test/test.component';
import {EvalFormModule} from "./eval-form/eval-form.module";
import { ViewMarksComponent } from './view-marks-m/view-marks/view-marks.component';

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
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase, 'myApp'),
    AngularFirestoreModule,
    ProjectModule,
    EvalFormModule,

  ],
  providers: [
    RenameTitleBarService, ProjectService, AngularFireDatabase, AngularFirestore, AuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, ProjectCardComponent, AddProjectComponent]
})
export class AppModule {
}
