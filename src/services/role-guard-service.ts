import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import * as Route from '../constants/routes';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const role = this.authService.getRole();
    if (
      !this.authService.isAuthenticated() ||
      role !== expectedRole
    ) {
      // Should pop up a restricted message.
      this.router.navigate([Route.LOGIN]);
      return false;
    }
    return true;
  }
}
