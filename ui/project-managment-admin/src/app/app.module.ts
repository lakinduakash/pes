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

import {environment} from "../environments/environment";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignupComponent} from './signup/signup.component';
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
import {FormDataService} from "./services/form-data.service";
import {EvalFireStoreFactory, EvalFireStoreProviderService} from "./services/eval-fire-store-provider.service";
import {ComponentsModule} from "./components/components.module";


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
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    LayoutModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'myApp'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    EvalFormModule,
    EvalFormParserModule,
    NgDragDropModule.forRoot(),
    AuthModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatProgressBarModule,
    ComponentsModule

  ],
  providers: [
    RenameTitleBarService, ProjectService, AngularFireDatabase, AngularFirestore, FormDataService,
    {provide: EvalFireStoreProviderService, deps: [PLATFORM_ID, NgZone], useFactory: EvalFireStoreFactory}
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: []
})
export class AppModule {
}
