import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ProjectMainViewComponentComponent} from "./project/project-main-view-component.component";
import {TestComponent} from "./test/test.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {FormViewComponent} from "./eval-form-parser/form-view.component";
import {ViewFormListComponent} from "./project/view-form-list/view-form-list.component";


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'project/:id', component: ProjectMainViewComponentComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestComponent},
  {path: 'view-form/:id', component: FormViewComponent},
  {path: 'create-form', component: TestComponent},
  {path: 'list-form', component: ViewFormListComponent},
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
