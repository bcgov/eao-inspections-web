import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';
import {getObject} from '../services/parse.service';
import {Team} from '../models/team.model';
import {BasicUser} from '../models/user.model';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class ProfileService {
  user = new Parse.User();
  constructor(private router: Router) {
    this.user = Parse.User.current();
  }

  getUser() {
    return new Promise((resolve, reject) => {
      resolve(this.user.toJSON());
    });
  }

  getTeams() {
    return new Promise((resolve, reject) => {
      const promises = [];
      const teams = [];
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find({
        success: function(results) {
          if (!results.length) {
            results = [results];
          }
          results.forEach((object) => {
            promises.push(teams.push(new Team(object.get('name'), object.get('teamAdmin.id'))));
          });
        },
        error: function(error) {
          reject (error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(teams);
        });
      });
    });
  }

  getTeamAdminInfo() {
    return new Promise((resolve, reject) => {
      const admins = [];
      const promises = [];
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find({
        success: function(results) {
          if (!results.length) {
            results = [results];
          }
          results.forEach((object) => {
            promises.push(object.get('teamAdmin').fetch().then((obj) => { admins.push(obj); }));
          });
        },
        error: function(error) {
          reject (error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(admins);
        });
      });
    });
  }
}


