import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Route from '../constants/routes';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: Route.LOGIN, component:  LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
