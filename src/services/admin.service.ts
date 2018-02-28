import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';
import {getObject} from '../services/parse.service';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class AdminService {
  user = new Parse.User();
  constructor(private router: Router) {
    this.user = Parse.User.current();
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      const teamQuery = new Parse.Query('Team');
      teamQuery.equalTo('userId', this.user.userId);

      const q = new Parse.Query('User');
      q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
        success: function (results) {
          resolve(results);
        },
        error: function (error) {
          reject(error.message);
        }
      });
    });
  }

  createUser(username: string, password: string, email: string) {
    return new Promise((resolve, reject) => {
      const user = new Parse.User();
      user.set('username', username);
      user.set('password', password);
      user.set('email', email);
      user.signUp(null, {
        success: function (results) {
          resolve(user);
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  updateUser(userId: string, attribute: string, value: string) {
    return new Promise((resolve, reject) => {
      const User = Parse.Object.extend('User');
      const query = Parse.Query(User);
      query.get(userId, {
        success: function (user) {
          user.set(attribute, value);
          user.save();
          resolve('success');
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  deleteUser(userId: string) {
    return new Promise((resolve, reject) => {
      const User = Parse.Object.extend('User');
      const query = Parse.Query(User);
      query.get(userId, {
        success: function (user) {
          user.set('status', 'NOT_ACTIVE');
          user.save();
          resolve('success');
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  createTeam(teamName: string) {
    return new Promise((resolve, reject) => {
      const team = new Parse.Object('Team');
      team.set('name', teamName);

      team.save(null, {
        success: function (results) {
          resolve('success');
        },
        error: function (object, error) {
          resolve(error.message);
        }
      });
    });
  }

  updateTeam(teamId: string, attribute: string, value: string) {
    return new Promise((resolve, reject) => {
      const Team = Parse.Object.extend('Team');
      const query = Parse.Query(Team);
      query.get(teamId, {
        success: function (team) {
          team.set(attribute, value);
          team.save();
          resolve('success');
        },
        error: function (object, error) {
          resolve(error.message);
        }
      });
    });
  }

  deleteTeam(teamId: string) {
    return new Promise((resolve, reject) => {
      const Team = Parse.Object.extend('User');
      const query = Parse.Query(Team);
      query.get(teamId, {
        success: function (team) {
          team.set('status', 'ARCHIVED');
          team.save();
          resolve('success');
        },
        error: function (object, error) {
          resolve(error.message);
        }
      });
    });
  }

  getReports() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.equalTo('userId', this.user.id);
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

  archiveReport(reportId) {
    return new Promise((resolve, reject) => {
      const Inspection = Parse.Object.extend('Inspection');
      const query = Parse.Query(Inspection);
      query.get(reportId, {
        success: function (report) {
          report.set('status', 'ARCHIVED');
          report.save();
          resolve('success');
        },
        error: function (object, error) {
          resolve(error.message);
        }
      });
    });
  }
}
