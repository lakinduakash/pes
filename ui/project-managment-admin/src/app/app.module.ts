import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatCardModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './shared/add-project/add-project.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectCardComponent } from './shared/project-card/project-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    DashboardComponent,
    AddProjectComponent,
    ProjectCardComponent,
  ],
  imports: [
    BrowserModule,MatToolbarModule, BrowserAnimationsModule, LayoutModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatCardModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
