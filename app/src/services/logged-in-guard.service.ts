import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import * as Route from '../constants/routes';
import { ProfileService } from './profile.service';

@Injectable()
export class LoggedInGuardService implements CanActivate {
  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      return true;
    } else {
      const isAdmin = (this.authService.isSuperAdmin() || this.authService.isAdmin());
      this.router.navigate([Route.HOME(isAdmin)]);
    }
    return false;
  }
}
