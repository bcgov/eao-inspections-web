import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import * as Route from '../constants/routes';
import * as ParseVar from '../constants/parse';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const expectedRole = route.data['expectedRole'];
      this.authService.getRole(expectedRole).then((val) => {
        if (val) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
