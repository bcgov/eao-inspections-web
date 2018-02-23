import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';
import * as Route from '../constants/routes';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = 'https://parseapi.back4app.com/';

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  logIn(username: string, password: string) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log(user);
        return true;
      },
      error: function(user, error) {
        return error.message;
      }
    }).then(this.router.navigate([Route.MY_REPORTS]));
  }

  logOut() {
    Parse.User.logOut().then(() => {
      const currentUser = Parse.User.current();  // this will now be null
      this.router.navigate([Route.LOGIN]);
    });
  }

  getRole() {}

  isAuthenticated() {
    return !!Parse.User.current();
  }
}
