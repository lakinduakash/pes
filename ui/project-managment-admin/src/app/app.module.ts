import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSidenavModule
} from '@angular/material';
import {DashboardComponent, DialogOverviewExampleDialog} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RenameTitleBarService} from "./services/rename-title-bar.service";
import {ProjectService} from "./services/project.service";
import {ProjectCardComponent} from "./shared/project-card/project-card.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    RenameTitleBarService, ProjectService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, ProjectCardComponent]
})
export class AppModule {
}
