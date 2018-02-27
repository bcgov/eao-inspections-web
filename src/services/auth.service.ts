import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';
import * as Route from '../constants/routes';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  logIn(username: string, password: string) {
    Parse.User.logIn(username, password)
      .then(() => {
        this.router.navigate([Route.MY_REPORTS]);
      },
      (obj, err) => {
        return err.message;
      });
  }

  logOut() {
    Parse.User.logOut()
      .then(() => {
        this.router.navigate([Route.LOGIN]);
    });
  }

  getRole(role: string) {
    return new Promise((resolve, reject) => {
      const currentUser = Parse.User.current();
      const roleObj = currentUser.get('role');
      if (roleObj) {
        roleObj.fetch().then((results) => {
          resolve (results.get('name') === role);
        }, (error) => {
          reject (false);
        });
      }
    });
  }

  isAuthenticated() {
    return !!Parse.User.current();
  }
}
