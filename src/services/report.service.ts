import { Injectable} from '@angular/core';

import { environment } from '../environments/environment';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class ReportService {
  user = new Parse.User();
  constructor() {
    this.user = Parse.User.current();
  }

  getMyReports(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.equalTo('userId', this.user.id);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
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

  getTeamReports(teamId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const teamQuery = new Parse.Query('Team');
      teamQuery.equalTo('id', teamId);
      const q = new Parse.Query('Inspection');
      q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
        success: function(results) {
          if (!Array.isArray(results)) {
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

  getElements(inspectionId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Observation');
      query.equalTo('inspectionId', inspectionId);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
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

