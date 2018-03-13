import { environment } from '../environments/environment';
import { Injectable} from '@angular/core';
import {Team} from '../models/team.model';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class ProfileService {
  user = new Parse.User();
  constructor() {
    this.user = Parse.User.current();
  }

  getUser(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.user);
    });
  }

  getTeams(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const promises = [];
      const teams = [];
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          results.forEach((object) => {
            promises.push(teams.push(new Team(object.id, object.get('name'), object.get('teamAdmin.id'))));
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

  getTeamAdminInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      const admins = [];
      const promises = [];
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          results.forEach((object) => {
            promises.push(object.get('teamAdmin')
              .fetch()
              .then((obj) => {
                admins.push(
                  {
                    'admin': obj,
                    'team': [new Team(object.id, object.get('name'), object.get('teamAdmin'))],
                  }
                );
              })
            );
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


