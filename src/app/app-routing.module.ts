import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Route from '../constants/routes';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MyReportsComponent } from './dashboard/reports/my-reports/my-reports.component';
import { TeamReportsComponent } from './dashboard/reports/team-reports/team-reports.component';
import { ProfileComponent } from './dashboard/profile-view/profile.component';
import { SettingsComponent } from './dashboard/settings-view/settings.component';
import { InspectionViewComponent } from './reusables/inspection-view/inspection-view.component';
import { ElementViewComponent } from './reusables/element-view/element-view.component';
import { UsersViewComponent } from './dashboard/admin/users-view/users-view.component';
import { ReportsViewComponent } from './dashboard/admin/reports-view/reports-view.component';
import { SearchViewComponent } from './dashboard/search-view/search-view.component';
import { TeamsViewComponent } from './dashboard/admin/teams-view/teams-view.component';
import { ManageTeamsViewComponent } from './dashboard/admin/teams-view/manage-teams-view/manage-teams-view.component';
import { TeamReportListComponent } from './team-report-list/team-report-list.component';

const routes: Routes = [
  // unauthenticated routes
  { path: Route.LOGIN, component:  LoginComponent },

  // user routes
  { path: '', redirectTo: Route.MY_REPORTS, pathMatch: 'full' },
  { path: Route.MY_REPORTS, component: MyReportsComponent },
  { path: Route.MY_REPORTS + Route.INSPECTION_DETAILS, component: InspectionViewComponent },
  { path: Route.MY_REPORTS + Route.INSPECTION_DETAILS + Route.ELEMENT_ID, component: ElementViewComponent },
  { path: Route.TEAM_REPORTS, component: TeamReportsComponent },
  { path: Route.TEAM_REPORTS + Route.TEAM_ID, component: TeamReportListComponent},
  { path: Route.TEAM_REPORTS + Route.TEAM_ID + Route.INSPECTION_DETAILS, component: InspectionViewComponent},
  { path: Route.TEAM_REPORTS + Route.TEAM_ID + Route.INSPECTION_DETAILS + Route.ELEMENT_ID, component: ElementViewComponent },
  { path: Route.PROFILE, component: ProfileComponent },
  { path: Route.SETTINGS, component: SettingsComponent },
  { path: Route.SEARCH, component: SearchViewComponent},

  // admin routes
  { path: Route.ADMIN_USERS, component: UsersViewComponent },
  { path: Route.ADMIN_TEAMS, component: TeamsViewComponent },
  { path: Route.ADMIN_TEAMS + Route.MANAGE_TEAM_ID, component: ManageTeamsViewComponent },
  { path: Route.ADMIN_REPORTS, component: ReportsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
