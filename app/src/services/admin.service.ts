import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Inspection } from '../models/inspection.model';
import { parseInspectionToModel, parseUserToModel, parseTeamToModel } from './parse.service';
import { BasicUser } from '../models/user.model';
import * as Access from '../constants/accessRights';

let Parse: any = require('parse');

@Injectable()
export class AdminService {
  user = new Parse.User();

  constructor(private router: Router) {
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
          reject(error);
        }
      });
    });
  }

  getAllUsers(): Promise<BasicUser[]> {
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query('User');
      const users = [];
      userQuery.find({
        success: function (results) {
          results.forEach((user) => {
              users.push(
                parseUserToModel(user)
              );
          });
          resolve(users);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  }

  getUsersByRole(_role: string): Promise<BasicUser[]> {
    return new Promise((resolve, reject) => {
      const roleQuery = new Parse.Query(Parse.Role);
      const users = [];
      roleQuery.equalTo('name', _role).first().then((role) => {
        const userQuery = new Parse.Query('User');
        userQuery.matchesKeyInQuery('objectId', 'objectId', role.get('users').query())
          .find({
            success: (results) => {
              results.forEach((user) => {
                  users.push(
                    parseUserToModel(user)
                  );
              });
              resolve(users);
            },
            error: (error) => {
              reject(error);
            }
        });
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
          reject(error);
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
          reject(error);
        }
      });
    });
  }

  // get correct access Object based on permission value
  getAppAccess(permission: string) {
    switch (permission) {
      case "superadmin":
        return Access.SUPERADMIN;
      case "admin":
        return Access.ADMIN;
      case "inspector(view)":
        return Access.VIEW_INSPECTOR;
      case "manager":
        return Access.MANAGER;
      default:
        return Access.INSPECTOR;
    }
  }

  // based on permission set one of 3 roles.
  getCorrectRole(permission: string) {
    switch (permission) {
      case "superadmin":
        return "superadmin";
      case "admin":
        return "admin";
      case "inspector(view)":
        return "inspector";
      case "manager":
        return "inspector";
      case "inspector":
        return "inspector";
      default:
        return "inspector";
    }
  }

  createUser(firstName: string,
             lastName: string,
             email: string,
             password: string,
             permission: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const promises = [];
      const role = this.getCorrectRole(permission);
      const access = this.getAppAccess(permission);
      const query = new Parse.Query(Parse.Role);
      const queryTeam = new Parse.Query('Team');
      const user = new Parse.User();
      user.set('isActive', true);
      user.set('access', access);
      user.set('firstName', firstName);
      user.set('username', email);
      user.set('lastName', lastName);
      user.set('password', password);
      user.set('email', email);
      user.set('publicEmail', email);
      user.set('permission', permission);
      user.save(null, {
        success: function (results) {
          query.equalTo('name', role);
          query.first().then((roleObject) => {
            roleObject.getUsers().add(results);
            promises.push(roleObject.save(null, {useMasterKey: true}));
          });
        },
        error: function (object, error) {
           reject(error);
        }
      }).then((userObject) => {
        Promise.all(promises).then(() => {
          resolve(userObject);
        }, error => {
          reject(error);
        });
      });
    });
  }

  updateUser(userId: string,
             firstName: string,
             lastName: string,
             email: string,
             permission: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const promises = [];
      const query = new Parse.Query(Parse.User);
      const q = new Parse.Query(Parse.Role);
      const roleQuery = new Parse.Query(Parse.Role);
      const role = this.getCorrectRole(permission);
      const access = this.getAppAccess(permission);
      query.get(userId, {
        success: function (user) {
          user.set('access', access);
          user.set('firstName', firstName);
          user.set('lastName', lastName);
          user.set('email', email);
          user.set('username', email);
          user.set('permission', permission);
          user.set('publicEmail', email);
          user.save(null, { useMasterKey: true,
            success: function (results) {
              q.equalTo('users', results);
              q.first().then((roleObject) => {
                roleObject.getUsers().remove(results);
                roleObject.save(null, { useMasterKey: true });
              });
              roleQuery.equalTo('name', role);
              roleQuery.first().then((roleObject) => {
                roleObject.getUsers().add(results);
                promises.push(roleObject.save(null, { useMasterKey: true }));
              });
            },
            error: function (object, error) {
              reject(error);
            } 
           }).then((userObject) => {
            Promise.all(promises).then(() => {
              resolve(userObject);
          }, (error) => {
            reject(error);
          });
        });
      }
    });
  });
}

  updatePassword(userId: string,
    password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.get(userId, {
        success: function (user) {
          user.set('password', password);
          user.save(null, { useMasterKey: true }).then((object) => {
            resolve(object);
          }, (error) => {
            reject(error);
          });
          resolve(user);
        },
        error: function (object, error) {
          reject(error);
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
            reject(error);
          });
        },
        error: function (object, error) {
          reject(error);
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
            reject(error);
          });
        },
        error: function (object, error) {
          reject(error);
        }
      });
    });
  }

  createTeam(teamName: string, color: string, adminID: string) {
    return new Promise((resolve, reject) => {
      const team = new Parse.Object('Team');
      team.set('name', teamName);
      team.set('color', color);
      team.set('isActive', true);
      team.save()
      .then(result => {
        const admin = new Parse.Query('User');
        admin.get(adminID).then((adminObj) => {
          result.set('teamAdmin', adminObj);
          result.save();
        });
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  updateTeam(teamId: string,
    teamName: string,
    color: string,
    adminId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('name', teamName);
          team.set('color', color);
          team.save(null, { useMasterKey: true })
          .then((object) => {
            const admin = new Parse.Query('User');
            admin.get(adminId).then((adminObj) => {
              object.set('teamAdmin', adminObj);
              object.save();
            });
            resolve(object);
          }, (error) => {
            reject(error);
          });
        },
        error: function (object, error) {
          reject(error);
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
            userRelation.query().count().then((count) => {
               const team = parseTeamToModel(object);
               team.numUsers = count;
               promises.push(teams.push(team));
            });
          });
        },
        error: function (error) {
          reject(error);
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
            userRelation.query().count().then((count) => {
              const team = parseTeamToModel(object);
              team.numUsers = count;
              promises.push(
                teams.push(
                  team
                )
              );
            });
          });
        },
        error: function (error) {
          reject(error);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(teams);
        });
      });
    });
  }

  archiveTeam(teamId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('isActive', false);
          team.save(null, { useMasterKey: true }).then(object => {
            resolve(object);
          }, error => {
            reject(error);
          });
        },
        error: function (object, error) {
          reject(error);
        }
      });
    });
  }

  unArchiveTeam(teamId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('isActive', true);
          team.save(null, { useMasterKey: true }).then(object => {
            resolve(object);
          }, error => {
            reject(error);
          });
        },
        error: function (object, error) {
          reject(error);
        }
      }).then(()=>{}, error=>{reject(error)});
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
          reject (error);
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
          reject (error);
        }
      });
    });
  }

  getArchivedReport(): Promise<Inspection[]> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      const reports = [];
      if (!this.user.get('access').isSuperAdmin) {
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
          report.set('isActive', false);
          report.save();
          resolve(report);
        },
        error: function (object, error) {
          resolve(error);
        }
      });
    });
  }

  unArchiveReport(reportId) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(reportId, {
        success: function (report) {
          report.set('isActive', true);
          report.save();
          resolve(report);
        },
        error: function (object, error) {
          resolve(error);
        }
      });
    });
  }


  getTeamMemebers(teamId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const query = new Parse.Query('Team');
        const users: Array<BasicUser> = [];
        query.equalTo('objectId', teamId);
        query.first({
            success: function(object) {
              object.get('users').query().find().then((results) => {
                results.forEach((user) => {
                    users.push(
                      parseUserToModel(user)
                    );
                 });
                resolve(users);
              });
            },
            error: function(error) {
                reject (error);
            }
        });
    });
  }

  addUsersToTeam(teamId: string, usersIds: Array<string>) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.equalTo('objectId', teamId);
      query.first({
          success: function(obj) {
            const relation = obj.relation('users');
            usersIds.forEach((userId) => {
              const user = Parse.Object.extend('User');
              const userObject = user.createWithoutData(userId);
              relation.add(userObject);
            });
            obj.save();
            resolve(obj);
          },
          error: function(error) {
              reject (error);
          }
      });
    });
  }

  removeMemberFromTeam(teamId: string, userId: string) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.equalTo('objectId', teamId);
      query.first({
          success: function(obj) {
            const relation = obj.relation('users');
            const user = Parse.Object.extend('User');
            const userObject = user.createWithoutData(userId);
            relation.remove(userObject);
            obj.save();
            resolve(obj);
          },
          error: function(error) {
              reject (error);
          }
      });
    });
  }

  updateReportPermission(reportId: string, permission: boolean) {
    return new Promise((resolve, reject) => {
      const report = Parse.Object.extend('Inspection');
      const reportObject = report.createWithoutData(reportId);
      reportObject.set('viewOnly', permission);
      reportObject.save().then(() => {
        resolve(reportObject);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
