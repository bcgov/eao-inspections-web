import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class ProfileService {
  user = new Parse.User();
  constructor(private router: Router) {
    this.user = Parse.User.current();
  }

  getTeams() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find({
        success: function(results) {
          if (!results.length) {
            results = [results];
          }
          resolve (results);
        },
        error: function(error) {
          reject (error.message);
        }
      });
    });
  }
}


