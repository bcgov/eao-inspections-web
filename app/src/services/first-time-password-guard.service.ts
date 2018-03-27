import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {ProfileService} from './profile.service';
import * as Route from '../constants/routes';

@Injectable()
export class FirstTimePasswordGuardService implements CanActivate {
  constructor(private profileService: ProfileService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.profileService.user) {
      if (this.profileService.user.get('hasLoggedIn')) {
        this.router.navigate([Route.DASHBOARD + '/' + Route.MY_REPORTS]);
      } else {
        return true
      }
    } else {
      this.router.navigate([Route.DASHBOARD + '/' + Route.MY_REPORTS]);
    }
  }
}
