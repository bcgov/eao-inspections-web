import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Route from '../constants/routes';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MyReportsComponent } from './dashboard/my-reports/my-reports.component';
import { TeamReportsComponent } from './dashboard/team-reports/team-reports.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: Route.LOGIN, component:  LoginComponent },
  { path: Route.MY_REPORTS, component: MyReportsComponent },
  { path: Route.TEAM_REPORTS, component: TeamReportsComponent },
  { path: Route.PROFILE, component: ProfileComponent },
  { path: Route.SETTINGS, component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
