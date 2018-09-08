import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SideNavComponent} from "./side-nav/side-nav.component";

@NgModule({
  declarations: [
    SideNavComponent,
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
  ],
  providers: [],
  exports: [
    SideNavComponent,
  ]
})
export class SharedModule {
}
