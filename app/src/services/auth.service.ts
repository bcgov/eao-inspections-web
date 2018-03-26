import { Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { parseUserToModel } from './parse.service';

let Parse: any = require('parse');

@Injectable()
export class AuthService {

  user: any;

  constructor() {
    this.user = Parse.User.current();

  }

  logIn(username: string, password: string): Promise<any> {
    return new Promise((resolve) => {
      Parse.User.logIn(username, password)
        .then((user) => {
            this.user = user;
            resolve(user);
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

  firstTimePassword(pw: string) {
    return new Promise((resolve, reject) => {
      const currentUser = Parse.User.current();
      currentUser.setPassword(pw);
      currentUser.save(null, {
        success: function(user) {
          user.set('hasLoggedIn', true);
          user.save().then(object => {
            resolve(object);
          }, error => {
            reject(error.message);
          });
        },
        error: function(user, error) {
          reject(error);
        }
      });
    });
  }

  isAuthenticated() {
    return !!Parse.User.current();
  }

  isAdmin() {
    const access = Parse.User.current().get('access');
    return (access && access.hasOwnProperty('isAdmin')) ? access.isAdmin : false;
  }

  isSuperAdmin() {
    const access = Parse.User.current().get('access');
    return (access && access.hasOwnProperty('isSuperAdmin')) ? access.isSuperAdmin : false;
  }
}
