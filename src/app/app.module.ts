import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { MyReportsComponent } from './dashboard/my-reports/my-reports.component';
import { TeamReportsComponent } from './dashboard/team-reports/team-reports.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileCardComponent } from './reusables/profile-card/profile-card.component';


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
    ProfileCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
