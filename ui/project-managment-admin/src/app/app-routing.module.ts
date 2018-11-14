import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

import {TestComponent} from "./test/test.component";
import {SignupComponent} from "./sign-in-up/signup/signup.component";
import {LoginComponent} from "./sign-in-up/login/login.component";
import {FormViewComponent} from "./eval-form-parser/form-view.component";
import {AuthGuard} from "./auth/auth.guard";
import {CanDeactivateGuard} from "./shared/can-deactivate-guard.service";
import { ViewMarksComponent } from './view-marks-m/view-marks/view-marks.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  {
    path: 'project',
    loadChildren: './project/project.module#ProjectModule'
  },
  {path: 'test', component: TestComponent},
  {path: 'form', component: FormViewComponent, canActivate: [AuthGuard]},
  {path: 'create-form', component: TestComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'viewmarks', component: ViewMarksComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {//enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
