import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';

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
      const query = new Parse.Query('User');
      query.get(userId, {
        success: function (user) {
          user.set(attribute, value);
          user.save();
          resolve(user);
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
      const query = new Parse.Query(User);
      query.get(userId, {
        success: function (user) {
          user.set('active', 'false');
          user.save();
          resolve(user);
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
      team.save('name', teamName).then(result => {
        console.log(result);
        resolve(result);
      }, error => {
        reject(error.message);
      });
    });
  }

  updateTeam(teamId: string, attribute: string, value: string) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (object) {
          object.set(attribute, value);
          object.save().then((obj) => {
            resolve(obj);
          });
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  deleteTeam(teamId: string) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('active', false);
          team.save().then((obj) => {
            resolve(obj);
          });
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
      query.equalTo('adminId', this.user.id);
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
      const query = new Parse.Query('Inspection');
      query.get(reportId, {
        success: function (report) {
          report.set('active', false);
          report.save();
          resolve(report);
        },
        error: function (object, error) {
          resolve(error.message);
        }
      });
    });
  }
}
