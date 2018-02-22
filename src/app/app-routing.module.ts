import { TeamsViewComponent } from './admin/teams-view/teams-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Route from '../constants/routes';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MyReportsComponent } from './dashboard/reports/my-reports/my-reports.component';
import { TeamReportsComponent } from './dashboard/reports/team-reports/team-reports.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportListComponent } from './dashboard/reports/report-list/report-list.component';
import { InspectionViewComponent } from './reusables/inspection-view/inspection-view.component';
import { ElementViewComponent } from './reusables/element-view/element-view.component';
import { UsersViewComponent } from './admin/users-view/users-view.component';
import { ReportsViewComponent } from './admin/reports-view/reports-view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: Route.LOGIN, component:  LoginComponent },
  { path: Route.MY_REPORTS, component: MyReportsComponent },
  { path: Route.TEAM_REPORTS, component: TeamReportsComponent },
  { path: Route.TEAM_REPORTS + Route.TEAM_ID, component: ReportListComponent},
  { path: Route.PROFILE, component: ProfileComponent },
  { path: Route.SETTINGS, component: SettingsComponent },
  { path: Route.INSPECTION_DETAILS, component: InspectionViewComponent},
  { path: Route.INSPECTION_DETAILS + Route.ELEMENT_ID, component: ElementViewComponent },

  { path: Route.ADMIN_USERS, component: UsersViewComponent },
  { path: Route.ADMIN_TEAMS, component: TeamsViewComponent },
  { path: Route.ADMIN_REPORTS, component: ReportsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
