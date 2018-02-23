import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import * as Route from '../constants/routes';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      // TODO: router redirect should be based on role of user.
      return true;
    } else {
      this.router.navigate([Route.LOGIN]);
      // TODO: insert message that user needs to be logged in.
    }
    return false;
  }
}
