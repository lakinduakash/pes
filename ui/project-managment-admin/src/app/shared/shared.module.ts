import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule} from '@angular/material';
import {SideNavComponent} from "./side-nav/side-nav.component";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";
import {CommonModule} from "@angular/common";
import {LoadingAnimColorComponent} from './loading-anim-color/loading-anim-color.component';

@NgModule({
  declarations: [
    SideNavComponent,
    LoadingAnimColorComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [CanDeactivateGuard],
  exports: [
    SideNavComponent,
    LoadingAnimColorComponent
  ]
})
export class SharedModule {
}
