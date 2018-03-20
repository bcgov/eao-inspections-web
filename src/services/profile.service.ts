import { environment } from '../environments/environment';
import { Injectable} from '@angular/core';
import {Team} from '../models/team.model';
import { parseTeamToModel } from './parse.service';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;
Parse.masterKey = environment.parseMasterKey;

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
            promises.push(teams.push(parseTeamToModel(object)));
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
          console.log(results);
          if (!Array.isArray(results)) {
            results = [results];
          }
          results.forEach((object) => {
            promises.push(object.get('teamAdmin')
              .fetch()
              .then((obj) => {
                console.log(obj);
                const team = parseTeamToModel(obj);
                admins.push(
                  {
                    'admin': obj,
                    'team': [team],
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


