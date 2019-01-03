import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NgZone, PLATFORM_ID} from '@angular/core';
import 'hammerjs';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {RenameTitleBarService} from "./services/rename-title-bar.service";
import {ProjectService} from "./services/project.service";

import {environment} from "../environments/environment";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TestComponent} from './test/test.component';
import {EvalFormModule} from "./eval-form/eval-form.module";
import {NgDragDropModule} from "ng-drag-drop";
import {EvalFormParserModule} from "./eval-form-parser/eval-form-parser.module";


import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {AuthModule} from "./auth/auth.module";
import {FormDataService} from "./services/form-data.service";
import {EvalFireStoreFactory, EvalFireStoreProviderService} from "./services/eval-fire-store-provider.service";
import {ComponentsModule} from "./components/components.module";
import {SignInUpModule} from "./sign-in-up/sign-in-up.module";
import {MatNativeDateModule} from "@angular/material";
import {MarkingViewModule} from "./marking-view/marking-view.module";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'myApp'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    EvalFormModule,
    EvalFormParserModule,
    NgDragDropModule.forRoot(),
    AuthModule,
    ComponentsModule,
    SignInUpModule,
    MatNativeDateModule,
    MarkingViewModule

  ],
  providers: [
    RenameTitleBarService, ProjectService, AngularFireDatabase, AngularFirestore, FormDataService,
    {provide: EvalFireStoreProviderService, deps: [PLATFORM_ID, NgZone], useFactory: EvalFireStoreFactory},
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: []
})
export class AppModule {
}
