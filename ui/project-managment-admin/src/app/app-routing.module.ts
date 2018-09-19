import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

import {ProjectMainViewComponentComponent} from "./project/project-main-view-component.component";
import {TestComponent} from "./test/test.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

import {FormViewComponent} from "./eval-form-parser/form-view.component";
import {ViewFormListComponent} from "./project/view-form-list/view-form-list.component";
import {AuthGuard} from "./auth/auth.guard";

import {PresentationComponent} from "./presentation/presentation/presentation.component";
import {CanDeactivateGuard} from "./shared/can-deactivate-guard.service";
import { ViewMarksComponent } from './view-marks-m/view-marks/view-marks.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent,  canActivate:[AuthGuard]},
  {
    path: 'project',
    children: [
      {
        path: ':id',
        children:
          [
            {path: '', component: ProjectMainViewComponentComponent, canActivate: [AuthGuard]},
            {
              path: 'presentation',
              children: [
                {
                  path: ':id',
                  children: [
                    {path: '', component: PresentationComponent, canActivate: [AuthGuard]},
                    {path: 'form/:id', component: TestComponent, canActivate: [AuthGuard]}

                  ]
                }
              ]
            },

          ]
      },
      {path: '**', component: PageNotFoundComponent}

    ]
  },
  {path: 'test', component: TestComponent},
  {path: 'view-form/:id', component: FormViewComponent,canActivate:[AuthGuard]},
  {path: 'create-form', component: TestComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'list-form', component: ViewFormListComponent,canActivate:[AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'viewmarks', component: ViewMarksComponent},
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
