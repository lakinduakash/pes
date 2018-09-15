import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ProjectMainViewComponentComponent} from "./project/project-main-view-component.component";
import {TestComponent} from "./test/test.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import { ProjectMainComponent } from './project/project-main/project-main.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'project/:id', component: ProjectMainViewComponentComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'project-main', component: ProjectMainComponent},
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
