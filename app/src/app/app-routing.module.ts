import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ArchivedInspectionsComponent } from './dashboard/admin/reports-view/archived-inspections/archived-inspections.component';
import { ArchivedTeamsComponent } from './dashboard/admin/teams-view/archived-teams/archived-teams.component';
import { ArchivedUsersComponent } from './dashboard/admin/users-view/archived-users/archived-users.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElementViewComponent } from './reusables/element-view/element-view.component';
import { FirstTimePasswordGuardService } from '../services/first-time-password-guard.service';
import { InspectionViewComponent } from './reusables/inspection-view/inspection-view.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuardService } from '../services/logged-in-guard.service';
import { ManageTeamsViewComponent } from './dashboard/admin/teams-view/manage-teams-view/manage-teams-view.component';
import { MyReportsComponent } from './dashboard/reports/my-reports/my-reports.component';
import { NoRouteComponent } from './no-route/no-route.component';
import { PasswordChangeComponent } from './login/password-change/password-change.component';
import { ProfileComponent } from './dashboard/profile-view/profile.component';
import { ReportsViewComponent } from './dashboard/admin/reports-view/reports-view.component';
import { ReportViewListComponent } from './dashboard/admin/reports-view/report-view-list/report-view-list.component';
import { RoleGuardService } from '../services/role-guard-service';
import { SearchViewComponent } from './dashboard/search-view/search-view.component';
import { SettingsComponent } from './dashboard/settings-view/settings.component';
import { TeamReportsComponent } from './dashboard/reports/team-reports/team-reports.component';
import { TeamReportListComponent } from './dashboard/reports/team-reports/team-report-list/team-report-list.component';
import { TeamsViewComponent } from './dashboard/admin/teams-view/teams-view.component';
import { UsersViewComponent } from './dashboard/admin/users-view/users-view.component';
import * as Route from '../constants/routes';

const routes: Routes = [
  // unauthenticated routes
  { path: Route.LOGIN, component: LoginComponent, canActivate: [LoggedInGuardService] },
  { path: Route.LOGIN + Route.CHANGE, component:  PasswordChangeComponent, canActivate: [AuthGuardService, FirstTimePasswordGuardService] },
  { path: '', redirectTo: Route.DASHBOARD + '/' + Route.PROFILE, pathMatch: 'full', canActivate: [AuthGuardService] },

  { path: Route.DASHBOARD, component: DashboardComponent,
    children: [
      // user routes
      { path: Route.MY_REPORTS, component: MyReportsComponent, canActivate: [AuthGuardService] },
      { path: Route.MY_REPORTS + Route.INSPECTION_DETAILS, component: InspectionViewComponent, canActivate: [AuthGuardService] },
      { path: Route.MY_REPORTS + Route.INSPECTION_DETAILS + Route.ELEMENT_ID, component: ElementViewComponent, canActivate: [AuthGuardService] },
      { path: Route.TEAM_REPORTS, component: TeamReportsComponent, canActivate: [AuthGuardService] },
      { path: Route.TEAM_REPORTS + Route.TEAM_ID, component: TeamReportListComponent, canActivate: [AuthGuardService] },
      { path: Route.TEAM_REPORTS + Route.TEAM_ID + Route.INSPECTION_DETAILS, component: InspectionViewComponent, canActivate: [AuthGuardService] },
      { path: Route.TEAM_REPORTS + Route.TEAM_ID + Route.INSPECTION_DETAILS + Route.ELEMENT_ID, component: ElementViewComponent, canActivate: [AuthGuardService] },
      { path: Route.PROFILE, component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: Route.SETTINGS, component: SettingsComponent, canActivate: [AuthGuardService] },
      { path: Route.SEARCH, component: SearchViewComponent, canActivate: [AuthGuardService] },

      // admin routes
      { path: Route.ADMIN_USERS, component: UsersViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ARCHIVED_USERS, component: ArchivedUsersComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ADMIN_TEAMS, component: TeamsViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ARCHIVED_TEAMS, component: ArchivedTeamsComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ADMIN_TEAMS + Route.MANAGE_TEAM_ID, component: ManageTeamsViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ADMIN_REPORTS, component: ReportsViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ARCHIVED_INSPECTIONS, component: ArchivedInspectionsComponent, canActivate: [AuthGuardService, RoleGuardService]},
      { path: Route.ADMIN_REPORTS + Route.TEAM_ID, component: ReportViewListComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ADMIN_REPORTS + Route.TEAM_ID+ Route.INSPECTION_DETAILS, component: InspectionViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: Route.ADMIN_REPORTS + Route.TEAM_ID + Route.INSPECTION_DETAILS + Route.ELEMENT_ID, component: ElementViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
    ]
  },

  // no-route
  { path: '**', component: NoRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
