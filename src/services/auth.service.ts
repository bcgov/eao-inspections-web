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

  getRole() {}

  isAuthenticated() {
    return !!Parse.User.current();
  }
}
