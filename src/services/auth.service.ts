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
      let isRole = false;
      const currentUser = Parse.User.current();
      const query = new Parse.Query('Role');
      query.equalto('name', role);
      query.equalto('users', currentUser);
      query.find({
        success: function(object) {
          if (object) {
            isRole = true;
          }
        },
        error: function(error) {
          reject(error.message);
        }
      }).then(() => {
        resolve(isRole);
      });
    });
  }

  isAuthenticated() {
    return !!Parse.User.current();
  }

  isAdmin() {
    return Parse.User.current().get('isAdmin');
  }

  isSuperAdmin() {
    return Parse.User.current().get('isSuperAdmin');
  }
}
