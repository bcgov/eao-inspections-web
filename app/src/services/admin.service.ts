import { Injectable } from '@angular/core';

import * as Access from '../constants/accessRights';
import { BasicUser } from '../models/user.model';
import { Inspection } from '../models/inspection.model';
import { parseInspectionToModel, parseUserToModel, parseTeamToModel } from './parse.service';
import { LoadingService } from './loading.service';
import { Team } from '../models/team.model';

const Parse: any = require('parse');
let self;

@Injectable()
export class AdminService {
  user = new Parse.User();

  constructor(private loadingService: LoadingService) {
    self = this;
    this.user = Parse.User.current();
  }

  getUsers() {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const teamQuery = new Parse.Query('Team');
      teamQuery.equalTo('userId', this.user.userId);

      const q = new Parse.Query('User');
      q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
        success: function (results) {
          self.loadingService.showLoading(false);
          resolve(results);
        },
        error: function (error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      });
    });
  }

  getUsersByRole(_role: string): Promise<BasicUser[]> {
    self.loadingService.showLoading(true);
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
              self.loadingService.showLoading(false);
              resolve(users);
            },
            error: (error) => {
              self.loadingService.showLoading(false);
              reject(error);
            }
        });
      });
    });
  }

  getArchivedUsers() {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');

      query.equalTo('isActive', false);
      query.find({
        success: function (results) {
          self.loadingService.showLoading(false);
          resolve(results);
        },
        error: function (error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      });
    });
  }

  getActiveUsers() {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const users = [];
      const query = new Parse.Query(Parse.User);

      query.equalTo('isActive', true);
      query.find({
        success: function (results) {
          results.forEach(objectUser => {
            const user = parseUserToModel(objectUser);
            const query = new Parse.Query('Team');
            query.equalTo('users', objectUser);
            query.find().then((objectTeams) => {
              objectTeams.forEach((team) => {
                user.teams.push(parseTeamToModel(team));
              })
            }).then(() => {
              users.push(user)
            });
          });
        },
        error: function (error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      }).then(() => {
        self.loadingService.showLoading(false);
        resolve(users);
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
             permission: string,
             photo: any): Promise<any> {
    self.loadingService.showLoading(true);
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
          if (photo) {
            const parseFile = new Parse.File('profile_image_' + results.id, photo, photo.type);
            promises.push(parseFile.save().then((objectFile) => {
              results.set('profileImage', objectFile);
              promises.push(results.save(null, {useMasterKey: true}));
            }));
          }
          query.equalTo('name', role);
          query.first().then((roleObject) => {
            roleObject.getUsers().add(results);
            promises.push(roleObject.save(null, {useMasterKey: true}));
          });
        },
        error: function (object, error) {
           self.loadingService.showLoading(false);
           reject(error);
        }
      }).then((userObject) => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(userObject);
        }, error => {
          self.loadingService.showLoading(false);
          reject(error);
        });
      });
    });
  }

  updateUser(userId: string,
             firstName: string,
             lastName: string,
             email: string,
             permission: string,
             photo: any): Promise<any> {
    self.loadingService.showLoading(true);
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
              if (photo) {
                const parseFile = new Parse.File('profile_image_' + results.id, photo, photo.type);
                promises.push(parseFile.save().then((objectFile) => {
                  results.set('profileImage', objectFile);
                  promises.push(results.save(null, { useMasterKey: true }));
                }));
              }
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
              self.loadingService.showLoading(false);
              reject(error);
            }
           }).then((userObject) => {
            Promise.all(promises).then(() => {
              self.loadingService.showLoading(false);
              resolve(userObject);
          }, (error) => {
            self.loadingService.showLoading(false);
            reject(error);
          });
        });
      }
    });
  });
}

  updatePassword(userId: string,
    password: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.get(userId, {
        success: function (user) {
          user.set('password', password);
          user.set('hasLoggedIn', false);
          user.save(null, { useMasterKey: true }).then((object) => {
            self.loadingService.showLoading(false);
            resolve(object);
          }, (error) => {
            self.loadingService.showLoading(false);
            reject(error);
          });
          self.loadingService.showLoading(false);
          resolve(user);
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      });
    });
  }

  archiveUser(userId: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.get(userId, {
        success: function (user) {
          user.set('isActive', false);
          user.save(null, {useMasterKey: true}).then(object => {
            self.loadingService.showLoading(false);
            resolve(object);
          }, error => {
            self.loadingService.showLoading(false);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      });
    });
  }

  unArchiveUser(userId: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');
      query.get(userId, {
        success: function (user) {
          user.set('isActive', true);
          user.save(null, {useMasterKey: true}).then(object => {
            self.loadingService.showLoading(false);
            resolve(object);
          }, error => {
            self.loadingService.showLoading(false);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      });
    });
  }

  createTeam(teamName: string, color: string, adminID: string, image) {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const promises = [];
      const team = new Parse.Object('Team');
      team.set('name', teamName);
      team.set('color', color);
      team.set('isActive', true);
      team.save(null, {
        success: function (results) {
          const admin = new Parse.Query('User');
          admin.get(adminID).then((adminObj) => {
            results.set('teamAdmin', adminObj);
            if (image) {
              const parseFile = new Parse.File('profile_image_' + results.id, image, image.type);
              promises.push(parseFile.save().then((objectFile) => {
                results.set('badge', objectFile);
                promises.push(results.save());
              }));
            } else {
              results.save();
            }
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      }).then((teamObject) => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(teamObject);
        }, error => {
          self.loadingService.showLoading(false);
          reject(error);
        });
      });
    });
  }

  updateTeam(teamId: string,
    teamName: string,
    color: string,
    adminId: string,
    image): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const promises = [];
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('name', teamName);
          team.set('color', color);
          team.save(null, {
            success: function (results) {
              const admin = new Parse.Query('User');
              admin.get(adminId).then((adminObj) => {
                results.set('teamAdmin', adminObj);
                if (image) {
                  const parseFile = new Parse.File('profile_image_' + results.id, image, image.type);
                  promises.push(parseFile.save().then((objectFile) => {
                    results.set('badge', objectFile);
                    promises.push(results.save());
                  }));
                } else {
                  results.save();
                }
              });
            },
            error: function (object, error) {
          self.loadingService.showLoading(false);
              reject(error);
            }
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      }).then((teamObject) => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(teamObject);
        }, error => {
          self.loadingService.showLoading(false);
          reject(error);
        });
      });
    });
  }

  getArchivedTeams(): Promise<Team[]> {
    self.loadingService.showLoading(true);
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
              const team = parseTeamToModel(object);
              const userRelation = object.relation('users');
              const inspectionQuery = new Parse.Query('Inspection');
              inspectionQuery.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': team.id},);
              userRelation.query().count().then((numUsers) => {
                team.numUsers = numUsers;
                inspectionQuery.count().then((numInspections) => {
                  team.numInspections = numInspections;
                  promises.push(
                    teams.push(
                      team
                    )
                  );
                });
             });
          });
        },
        error: function (error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(teams);
        });
      });
    });
  }

  getActiveTeams(): Promise<Team[]> {
    self.loadingService.showLoading(true);
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
            const team = parseTeamToModel(object);
            const userRelation = object.relation('users');
            const inspectionQuery = new Parse.Query('Inspection');
            inspectionQuery.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': team.id},);
            userRelation.query().count().then((numUsers) => {
              team.numUsers = numUsers;
              inspectionQuery.count().then((numInspections) => {
                team.numInspections = numInspections;
                promises.push(
                  teams.push(
                    team
                  )
                );
              });
            });
          });
        },
        error: function (error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(teams);
        });
      });
    });
  }

  archiveTeam(teamId: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('isActive', false);
          team.save(null, { useMasterKey: true }).then(object => {
          self.loadingService.showLoading(false);
            resolve(object);
          }, error => {
          self.loadingService.showLoading(false);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      });
    });
  }

  unArchiveTeam(teamId: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(teamId, {
        success: function (team) {
          team.set('isActive', true);
          team.save(null, { useMasterKey: true }).then(object => {
          self.loadingService.showLoading(false);
            resolve(object);
          }, error => {
          self.loadingService.showLoading(false);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          reject(error);
        }
      }).then(()=>{}, error=>{     self.loadingService.showLoading(true);
 reject(error)});
    });
  }

  getReports() {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.equalTo('adminId', this.user.id);
      query.find({
        success: function(results) {
          if (!results.length) {
            results = [results];
          }
          self.loadingService.showLoading(false);
          resolve (results);
        },
        error: function(error) {
          self.loadingService.showLoading(false);
          reject (error);
        }
      });
    });
  }

  getInspector(inspectorId: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query('User')
      userQuery.equalTo('objectId', inspectorId);
      userQuery.first({
        success: function(result) {
          const inspector = parseUserToModel(result);
          self.loadingService.showLoading(false);
          resolve (inspector);
        },
        error: function(error) {
          self.loadingService.showLoading(false);
          reject (error);
        }
      });
    });
  }

  getArchivedReport(): Promise<Inspection[]> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      const reports = [];
      const access = this.user.get('access');
      if (access && !access.hasOwnProperty('isSuperAdmin')) {
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
          self.loadingService.showLoading(false);
          resolve(reports);
        }).catch((error) => {
          self.loadingService.showLoading(false);
          reject(error);
        });
    });
  }

  archiveReport(reportId) {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(reportId, {
        success: function (report) {
          report.set('isActive', false);
          report.save();
          self.loadingService.showLoading(false);
          resolve(report);
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          resolve(error);
        }
      });
    });
  }

  unArchiveReport(reportId) {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(reportId, {
        success: function (report) {
          report.set('isActive', true);
          report.save();
          self.loadingService.showLoading(false);
          resolve(report);
        },
        error: function (object, error) {
          self.loadingService.showLoading(false);
          resolve(error);
        }
      });
    });
  }


  getTeamMemebers(teamId: string): Promise<any> {
    self.loadingService.showLoading(true);
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
                 self.loadingService.showLoading(false);
                resolve(users);
              });
            },
            error: function(error) {
              self.loadingService.showLoading(false);
                reject (error);
            }
        });
    });
  }

  addUsersToTeam(teamId: string, usersIds: Array<string>) {
    self.loadingService.showLoading(true);
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
            self.loadingService.showLoading(false);
            resolve(obj);
          },
          error: function(error) {
            self.loadingService.showLoading(false);
              reject (error);
          }
      });
    });
  }

  removeMemberFromTeam(teamId: string, userId: string) {
    self.loadingService.showLoading(true);
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
            self.loadingService.showLoading(false);
            resolve(obj);
          },
          error: function(error) {
            self.loadingService.showLoading(false);
              reject (error);
          }
      });
    });
  }

  updateReportPermission(reportId: string, permission: boolean) {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const report = Parse.Object.extend('Inspection');
      const reportObject = report.createWithoutData(reportId);
      reportObject.set('viewOnly', permission);
      reportObject.save().then(() => {
        self.loadingService.showLoading(false);
        resolve(reportObject);
      }).catch((error) => {
        self.loadingService.showLoading(false);
        reject(error);
      });
    });
  }

}
