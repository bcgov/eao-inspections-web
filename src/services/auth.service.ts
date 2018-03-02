import { Injectable} from '@angular/core';

import { environment } from '../environments/environment';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class AuthService {

  constructor() {}

  logIn(username: string, password: string) {
    return new Promise((resolve) => {
      Parse.User.logIn(username, password)
        .then(() => {
            resolve(true);
          },
          () => {
            resolve(false);
          });
    });
  }

  logOut() {
    return new Promise((resolve) => {
      Parse.User.logOut()
        .then(() => {
            resolve(true);
          },
          () => {
            resolve(false);
          });
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

  isAdmin() {
    return (Parse.User.current().get('roleName') === 'admin' || 'superadmin');
  }

  isSuperAdmin() {
    return (Parse.User.current().get('roleName') === 'superadmin');
  }
}
