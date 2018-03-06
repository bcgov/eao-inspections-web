import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import * as ParseVar from '../constants/parse';
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
import { TeamReportListComponent } from './dashboard/reports/team-reports/team-report-list/team-report-list.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {RoleGuardService} from '../services/role-guard-service';
import { NoRouteComponent } from './no-route/no-route.component';

const routes: Routes = [
  // unauthenticated routes
  { path: Route.LOGIN, component:  LoginComponent },

  // user routes
  { path: '', redirectTo: Route.MY_REPORTS, pathMatch: 'full', canActivate: [AuthGuardService] },
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
  { path: Route.ADMIN_USERS, component: UsersViewComponent, canActivate: [AuthGuardService, RoleGuardService], data: { 'expectedRole': ParseVar.SUADMIN} },
  { path: Route.ADMIN_TEAMS, component: TeamsViewComponent, canActivate: [AuthGuardService, RoleGuardService], data: { 'expectedRole': ParseVar.SUADMIN} },
  { path: Route.ADMIN_TEAMS + Route.MANAGE_TEAM_ID, component: ManageTeamsViewComponent, canActivate: [AuthGuardService, RoleGuardService], data: { 'expectedRole': ParseVar.SUADMIN} },
  { path: Route.ADMIN_REPORTS, component: ReportsViewComponent, canActivate: [AuthGuardService, RoleGuardService], data: { 'expectedRole': ParseVar.SUADMIN} },

  // no-route
  { path: '**', component: NoRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
