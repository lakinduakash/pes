import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NgZone, PLATFORM_ID} from '@angular/core';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PresentationModule} from "./presentation/presentation.module";
import {FormDataService} from "./services/form-data.service";
import {EvalFireStoreFactory, EvalFireStoreProviderService} from "./services/eval-fire-store-provider.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    TestComponent,
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
    RenameTitleBarService, ProjectService, AngularFireDatabase, AngularFirestore, FormDataService,
    {provide: EvalFireStoreProviderService, deps: [PLATFORM_ID, NgZone], useFactory: EvalFireStoreFactory}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, ProjectCardComponent, AddProjectComponent],
  exports: []
})
export class AppModule {
}
