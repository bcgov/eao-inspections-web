import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { MyReportsComponent } from './dashboard/reports/my-reports/my-reports.component';
import { TeamReportsComponent } from './dashboard/reports/team-reports/team-reports.component';
import { ProfileComponent } from './dashboard/profile-view/profile.component';
import { SettingsComponent } from './dashboard/settings-view/settings.component';
import { ProfileCardComponent } from './reusables/profile-card/profile-card.component';
import { TeamCardComponent } from './reusables/team-card/team-card.component';
import { ReportListComponent } from './reusables/report-list/report-list.component';
import { InspectionViewComponent } from './reusables/inspection-view/inspection-view.component';
import { ElementViewComponent } from './reusables/element-view/element-view.component';
import { UsersViewComponent } from './dashboard/admin/users-view/users-view.component';
import { TeamsViewComponent } from './dashboard/admin/teams-view/teams-view.component';
import { ReportsViewComponent } from './dashboard/admin/reports-view/reports-view.component';
import { SearchViewComponent } from './dashboard/search-view/search-view.component';
import { UserCardComponent } from './reusables/user-card/user-card.component';
import { ManageTeamsViewComponent } from './dashboard/admin/teams-view/manage-teams-view/manage-teams-view.component';
import { TeamReportListComponent } from './team-report-list/team-report-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    MyReportsComponent,
    TeamReportsComponent,
    ProfileComponent,
    SettingsComponent,
    ProfileCardComponent,
    TeamCardComponent,
    ReportListComponent,
    InspectionViewComponent,
    ElementViewComponent,
    UsersViewComponent,
    TeamsViewComponent,
    ReportsViewComponent,
    SearchViewComponent,
    UserCardComponent,
    ManageTeamsViewComponent,
    TeamReportListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
