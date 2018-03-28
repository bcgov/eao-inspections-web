import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthService} from './auth.service';
import * as Route from '../constants/routes';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAdmin() || this.authService.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate([Route.HOME(false)]);
    }
    return false;
  }
}
