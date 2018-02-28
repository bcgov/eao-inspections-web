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
    const teamQuery = new Parse.Query('Team');
    teamQuery.equalTo('userId', this.user.userId);

    const q = new Parse.Query('User');
    q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
      success: function(results) {
        return results;
      },
      error: function(error) {
        return error.message;
      }
    });
  }

  createUser(username: string, password: string, email: string) {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    // other fields to be set

    user.signUp(null, {
      success: function(results) {
        // Hooray! Let them use the app now.
        return user;
      },
      error: function(object, error) {
        // Show the error message somewhere and let the user try again.
        return error.message;
      }
    });
  }

  updateUser(userId: string, attribute: string, value: string) {
    const User = Parse.Object.extend('User');
    const query = Parse.Query(User);
    query.get(userId, {
      success: function(user) {
        // The object was retrieved successfully.
        user.set(attribute, value);
        user.save();
        return 'success';
      },
      error: function(object, error) {
        return error.message;
      }
    });
  }

  deleteUser(userId: string) {
    const User = Parse.Object.extend('User');
    const query = Parse.Query(User);
    query.get(userId, {
      success: function(user) {
        // The object was retrieved successfully.
        user.set('status', 'NOT_ACTIVE');
        user.save();
        return 'success';
      },
      error: function(object, error) {
        return error.message;
      }
    });
  }

  createTeam(teamName: string) {
    const team = new Parse.Object('Team');
    team.set('name', teamName);

    team.save(null, {
      success: function(results) {
        return 'success';
      },
      error: function(object, error) {
        return error.message;
      }
    });
  }
  updateTeam(teamId: string, attribute: string, value: string) {
    const Team = Parse.Object.extend('Team');
    const query = Parse.Query(Team);
    query.get(teamId, {
      success: function(team) {
        // The object was retrieved successfully.
        team.set(attribute, value);
        team.save();
        return 'success';
      },
      error: function(object, error) {
        return error.message;
      }
    });
  }
  deleteTeam(teamId: string) {
    const Team = Parse.Object.extend('User');
    const query = Parse.Query(Team);
    query.get(teamId, {
      success: function(team) {
        // The object was retrieved successfully.
        team.set('status', 'ARCHIVED');
        team.save();
        return 'success';
      },
      error: function(object, error) {
        return error.message;
      }
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
    const Inspection = Parse.Object.extend('Inspection');
    const query = Parse.Query(Inspection);
    query.get(reportId, {
      success: function(report) {
        // The object was retrieved successfully.
        report.set('status', 'ARCHIVED');
        report.save();
        return 'success';
      },
      error: function(object, error) {
        return error.message;
      }
    });
  }
}
