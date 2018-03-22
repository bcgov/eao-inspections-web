import { Injectable} from '@angular/core';

import { environment } from '../environments/environment';
import { parseUserToModel } from './parse.service';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;
Parse.masterKey = environment.parseMasterKey;

@Injectable()
export class AuthService {

  user = new Parse.User();

  constructor() {
    this.user = Parse.User.current();
  }

  logIn(username: string, password: string) {
    return new Promise((resolve) => {
      Parse.User.logIn(username, password)
        .then((user) => {
            this.user = user;
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
      query.get('name', role);
      query.get('users', currentUser);
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

  sendResetPassword(email: string) {
    return new Promise((resolve, reject) => {
      Parse.User.requestPasswordReset(email, {
        success: function() {
          resolve();

        },
        error: function(error) {
          // Show the error message somewhere
          reject(error);
        }
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
