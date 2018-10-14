import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

import {TestComponent} from "./test/test.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {FormViewComponent} from "./eval-form-parser/form-view.component";
import {AuthGuard} from "./auth/auth.guard";
import {CanDeactivateGuard} from "./shared/can-deactivate-guard.service";


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  {
    path: 'project',
    loadChildren: './project/project.module#ProjectModule'
  },
  {path: 'test', component: TestComponent},
  {path: 'view-form/:id', component: FormViewComponent,canActivate:[AuthGuard]},
  {path: 'create-form', component: TestComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
