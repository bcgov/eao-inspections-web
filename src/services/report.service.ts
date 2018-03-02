import { Injectable} from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import * as Route from '../constants/routes';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class ReportService {
  user = new Parse.User();
  constructor(private router: Router) {
    this.user = Parse.User.current();
  }
  getMyReports() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.equalTo('userId', this.user.id);
      query.find({
        success: function(results) {
          if (results.length === 1) {
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

  getTeamReports(teamId: string) {
    return new Promise((resolve, reject) => {
      const teamQuery = new Parse.Query('Team');
      teamQuery.equalTo('id', teamId);

      const q = new Parse.Query('Inspection');
      q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
        success: function(results) {
          return results;
        },
        error: function(error) {
          return error.message;
        }
      });
    });
  }

  getElements(inspectionId: string) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Observation');
      query.equalTo('inspectionId', inspectionId);
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

