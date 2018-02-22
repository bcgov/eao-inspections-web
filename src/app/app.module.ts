import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { MyReportsComponent } from './dashboard/reports/my-reports/my-reports.component';
import { TeamReportsComponent } from './dashboard/reports/team-reports/team-reports.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileCardComponent } from './reusables/profile-card/profile-card.component';
import { TeamCardComponent } from './reusables/team-card/team-card.component';
import { ReportListComponent } from './dashboard/reports/report-list/report-list.component';
import { InspectionViewComponent } from './reusables/inspection-view/inspection-view.component';
import { ElementViewComponent } from './reusables/element-view/element-view.component';
import { UsersViewComponent } from './admin/users-view/users-view.component';
import { TeamsViewComponent } from './admin/teams-view/teams-view.component';
import { ReportsViewComponent } from './admin/reports-view/reports-view.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    MyReportsComponent,
    TeamReportsComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    ProfileCardComponent,
    TeamCardComponent,
    ReportListComponent,
    InspectionViewComponent,
    ElementViewComponent,
    UsersViewComponent,
    TeamsViewComponent,
    ReportsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
