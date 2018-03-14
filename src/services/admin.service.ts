import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';
import { Team } from '../models/team.model';
import { Inspection } from '../models/inspection.model';
import { parseInspectionToModel, parseUserToModel, parseTeamToModel } from './parse.service';
import { BasicUser } from '../models/user.model';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;
Parse.masterKey = environment.parseMasterKey;

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

  getAllUsers() {
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query('User');
      userQuery.find({
        success: function (results) {
          resolve(results);
        },
        error: function (error) {
          reject(error.message);
        }
      });
    });
  }

  getArchivedUsers() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');
      query.equalTo('isActive', false);
      query.find({
        success: function (results) {
          resolve(results);
        },
        error: function (error) {
          reject(error.message);
        }
      });
    });
  }

  getActiveUsers() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');
      query.equalTo('isActive', true);
      query.find({
        success: function (results) {
          resolve(results);
        },
        error: function (error) {
          reject(error.message);
        }
      });
    });
  }

  getSuperAdminStatus(permission: string) {
    return permission === 'superadmin';
  }

  getAdminStatus(permission: string) {
    return permission === 'admin';
  }

  createUser(firstName: string,
             lastName: string,
             email: string,
             password: string,
             team: any,
             permission: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const promises = [];
      const query = new Parse.Query(Parse.Role);
      const queryTeam = new Parse.Query('Team');
      const user = new Parse.User();
      user.set('isActive', true);
      user.set('isAdmin', this.getAdminStatus(permission));
      user.set('isSuperAdmin', this.getSuperAdminStatus(permission));
      user.set('firstName', firstName);
      user.set('username', email);
      user.set('lastName', lastName);
      user.set('password', password);
      user.set('email', email);
      user.set('publicEmail', email);
      user.set('permission', permission);
      user.save(null, {
        success: function (results) {
          queryTeam.get(team).then((teamObject) => {
            teamObject.relation('users').add(results);
            promises.push(teamObject.save());
          });
          query.equalTo('name', permission);
          query.first().then((roleObject) => {
            roleObject.getUsers().add(results);
            promises.push(roleObject.save(null, {useMasterKey: true}));
          });
        },
        error: function (object, error) {
          reject(error.message);
        }
      }).then((userObject) => {
        Promise.all(promises).then(() => {
          resolve(userObject);
        }, error => {
          reject(error.message);
        });
      });
    });
  }

  updateUser(userId: string,
             firstName: string,
             lastName: string,
             email: string,
             password: string,
             team: string,
             permission: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.get(userId, {
        success: function (user) {
          user.set('firstName', firstName);
          user.set('lastName', lastName);
          user.set('email', email);
          user.set('password', password);
          user.set('team', team);
          user.set('permission', permission);
          user.save(null, { useMasterKey: true }).then((object) => {
            resolve(object);
          }, (error) => {
            reject(error.message);
          });
          resolve(user);
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  archiveUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.get(userId, {
        success: function (user) {
          user.set('isActive', false);
          user.save(null, {useMasterKey: true}).then(object => {
            resolve(object);
          }, error => {
            reject(error.message);
          });
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  unArchiveUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');
      query.get(userId, {
        success: function (user) {
          user.set('isActive', true);
          user.save(null, {useMasterKey: true}).then(object => {
            resolve(object);
          }, error => {
            reject(error.message);
          });
        },
        error: function (object, error) {
          reject(error.message);
        }
      });
    });
  }

  createTeam(teamName: string, color: string) {
    return new Promise((resolve, reject) => {
      const team = new Parse.Object('Team');
      team.set('name', teamName);
      team.set('color', color);
      team.set('isActive', true);
      team.save()
      .then(result => {
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

  getArchivedTeams(): Promise<Team[]> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      const promises = [];
      const teams = [];
      query.equalTo('isActive', false);
      query.find({
        success: function (results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          results.forEach((object) => {
            const userRelation = object.relation('users');
            userRelation.query().find().then((users) => {
               const team = parseTeamToModel(object);
               team.users = users;
               promises.push(teams.push(team));
            });
          });
        },
        error: function (error) {
          reject(error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(teams);
        });
      });
    });
  }

  getActiveTeams(): Promise<Team[]> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      const promises = [];
      const teams = [];
      query.equalTo('isActive', true);
      query.find({
        success: function (results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          results.forEach((object) => {
            const userRelation = object.relation('users');
            userRelation.query().find().then((users) => {
              const team = parseTeamToModel(object);
              team.users = users;
              promises.push(
                teams.push(
                  team
                )
              );
            });
          });
        },
        error: function (error) {
          reject(error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(teams);
        });
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

  getInspector(inspectorId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query('User')
      userQuery.equalTo('objectId', inspectorId);
      userQuery.first({
        success: function(result) {
          const inspector = parseUserToModel(result);
          resolve (inspector);
        },
        error: function(error) {
          console.log(error);
          reject (error.message);
        }
      });
    });
  }


  getArchivedReport(): Promise<Inspection[]> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      const reports = [];
      if (!this.user.get('isSuperAdmin')) {
        query.equalTo('adminId', this.user.id);
      }
      query.equalTo('isActive', false);
      query.find().then((results) => {
          results.forEach((object) => {
            this.getInspector(object.get('userId'))
            .then((inspector) => {
              const inspection = parseInspectionToModel(object);
              inspection.inspector = inspector;
              reports.push(
                inspection
              );
            });
          });
          resolve(reports);
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
