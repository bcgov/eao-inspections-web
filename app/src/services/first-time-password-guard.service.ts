import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import * as Route from '../constants/routes';
import { ProfileService } from './profile.service';

@Injectable()
export class FirstTimePasswordGuardService implements CanActivate {
  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.profileService.user) {
      if (this.profileService.user.get('hasLoggedIn')) {
        const isAdmin = (this.authService.isSuperAdmin() || this.authService.isAdmin()) ? true : false;
        this.router.navigate([Route.HOME(isAdmin)]);
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
