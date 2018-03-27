import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const expectedRole = route.data['expectedRole'];
      // console.log(expectedRole);
      this.authService.getRole(expectedRole).then((val) => {
        // console.log(val);
        if (val) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
