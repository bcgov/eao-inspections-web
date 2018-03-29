import { Injectable } from '@angular/core';

import * as Access from '../constants/accessRights';
import { BasicUser } from '../models/user.model';
import { Inspection } from '../models/inspection.model';
import { parseInspectionToModel, parseUserToModel, parseTeamToModel } from './parse.service';
import { LoadingService } from './loading.service';
import { Team } from '../models/team.model';
import { randomKey } from './testing.service';
import { ToastrService } from 'ngx-toastr';

const Parse: any = require('parse');
let self;

@Injectable()
export class AdminService {
  user = new Parse.User();
  page = 0;
  totalPages = 0;
  displayLimit = 5;
  constructor(private loadingService: LoadingService, private toast: ToastrService) {
    self = this;
    this.user = Parse.User.current();
  }

  getUsers() {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const teamQuery = new Parse.Query('Team');
      teamQuery.equalTo('userId', this.user.userId);

      const q = new Parse.Query('User');
      q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
        success: function (results) {
          self.loadingService.showLoading(false, key);
          resolve(results);
        },
        error: function (error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      });
    });
  }

  getUsersByRole(_role: string): Promise<BasicUser[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
              self.loadingService.showLoading(false, key);
              resolve(users);
            },
            error: (error) => {
              self.loadingService.showLoading(false, key);
              reject(error);
            }
        });
      });
    });
  }

  getArchivedUsers(page=0): Promise<Array<BasicUser>> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');
      const users = [];
      const queryCount = new Parse.Query(Parse.User);
      queryCount.equalTo('isActive',false);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
        });
      }
      this.page = page;
      query.equalTo('isActive', false);
      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      query.find({
        success: function (results) {
          self.loadingService.showLoading(false, key);
          results.forEach((user) => {
            users.push(parseUserToModel(user));
          });
          resolve(users);
        },
        error: function (error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      });
    });
  }

  getActiveUsers(page = 0): Promise<Array<BasicUser>> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const users = [];
      const promises = [];
      const query = new Parse.Query(Parse.User);

      query.equalTo('isActive', true);
      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      query.find()
      .then((results) => {
          results.forEach(objectUser => {
            const user = parseUserToModel(objectUser);
            const query2 = new Parse.Query('Team');
            query2.equalTo('users', objectUser);
            promises.push(query2.find());
            users.push(user);
          });
      })
      .then(() => Promise.all(promises))
      .then((results) => {
        results.map((objectTeams, index) => {
          objectTeams.forEach((team) => {
            users[index].teams.push(parseTeamToModel(team));
          });
          self.loadingService.showLoading(false, key);
        });

        const queryCount = new Parse.Query(Parse.User);
        queryCount.equalTo('isActive', true);
        if (this.page === 0) {
          queryCount.count().then((count) => {
            this.totalPages = Math.ceil(count / this.displayLimit);
            console.log(this.totalPages);
            resolve(users);
          });
        } else {
          resolve(users);
        }
       })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
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
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
           self.loadingService.showLoading(false, key);
           reject(error);
        }
      }).then((userObject) => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false, key);
          resolve(userObject);
        }, error => {
          self.loadingService.showLoading(false, key);
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
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
              self.loadingService.showLoading(false, key);
              reject(error);
            }
           }).then((userObject) => {
            Promise.all(promises).then(() => {
              self.loadingService.showLoading(false, key);
              resolve(userObject);
          }, (error) => {
            self.loadingService.showLoading(false, key);
            reject(error);
          });
        });
      }
    });
  });
}

  updatePassword(userId: string,
    password: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.get(userId, {
        success: function (user) {
          user.set('password', password);
          user.set('hasLoggedIn', false);
          user.save(null, { useMasterKey: true }).then((object) => {
            self.loadingService.showLoading(false, key);
            resolve(object);
          }, (error) => {
            self.loadingService.showLoading(false, key);
            reject(error);
          });
          self.loadingService.showLoading(false, key);
          resolve(user);
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      });
    });
  }

// remove members from teams when they are archived
  removeFromTeam(user){
    const teamId = [];
    user.teams.map(team => {
      teamId.push(team.id);
    });
    teamId.map(id => {
      this.removeMemberFromTeam(id, user.id);
    })
  }

  archiveUser(user): Promise<any> {
    let teams = [];
    if(!user.access.isAdmin || !user.access.isSuperAdmin) {
      this.removeFromTeam(user);
    } 

    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      const teamQuery = new Parse.Query('Team');
      const tempUser = new Parse.User();
      tempUser.id = user.id
      teamQuery.equalTo('teamAdmin', tempUser);
      teamQuery.find().then((adminObject) => {
        if(adminObject.length == 0){
          query.get(user.id, {
            success: function (user) {
              user.set('isActive', false);
              user.save(null, {useMasterKey: true}).then(object => {
                self.loadingService.showLoading(false, key);
                resolve(object);
              }, error => {
                self.loadingService.showLoading(false, key);
                reject(error);
              });
            },
            error: function (object, error) {
              self.loadingService.showLoading(false, key);
              reject(error);
            }
          });
        } else {
          self.loadingService.showLoading(false, key);
          this.toast.error("Cannot Archive " + user.name + ". Please remove them as a team Administrator")
        }
      });
    });
  }

  unArchiveUser(user): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('User');
      query.get(user.id, {
        success: function (user) {
          user.set('isActive', true);
          user.save(null, {useMasterKey: true}).then(object => {
            self.loadingService.showLoading(false, key);
            resolve(object);
          }, error => {
            self.loadingService.showLoading(false, key);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      });
    });
  }

  createTeam(teamName: string, color: string, adminID: string, image) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      }).then((teamObject) => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false, key);
          resolve(teamObject);
        }, error => {
          self.loadingService.showLoading(false, key);
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
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
          self.loadingService.showLoading(false, key);
              reject(error);
            }
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      }).then((teamObject) => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false, key);
          resolve(teamObject);
        }, error => {
          self.loadingService.showLoading(false, key);
          reject(error);
        });
      });
    });
  }

  getArchivedTeams(page=0): Promise<Team[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      const promises1 = [];
      const promises2 = [];
      const teams = [];
      const queryCount = new Parse.Query('Team');
      queryCount.equalTo('isActive', false);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
          console.log(count);
        });
      }
      this.page = page;
      query.equalTo('isActive', false);
      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      query.equalTo('isActive', false);
      query.find().then((results) => {
        if (!Array.isArray(results)) {
          results = [results];
        }
        results.forEach((object) => {
          const team = parseTeamToModel(object);
          const userRelation = object.relation('users');
          const inspectionQuery = new Parse.Query('Inspection');
          inspectionQuery.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': team.id},);
          promises1.push(userRelation.query().count());
          promises2.push(inspectionQuery.count());
          teams.push(team);
        });
      })
      .then(() => Promise.all(promises1))
      .then((results) => {
        results.map((numUsers, index) => {
          teams[index].numUsers = numUsers;
        });
        return Promise.all(promises2);
      })
      .then((results) => {
        results.map((numInspections, index) => {
          teams[index].numInspections = numInspections;
        });
        self.loadingService.showLoading(false, key);
        resolve(teams);
      })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      });
    });
  }

  getActiveTeams(page=0): Promise<Array<Team>> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      const promises1 = [];
      const promises2 = [];

      const teams = [];
      const queryCount = new Parse.Query('Team');
      queryCount.equalTo('isActive',true);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
          console.log(count);
        });
      }
      this.page = page;
      query.equalTo('isActive', true);

      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      query.find().then((results) => {
        if (!Array.isArray(results)) {
          results = [results];
        }
        results.forEach((object) => {
          const team = parseTeamToModel(object);
          const userRelation = object.relation('users');
          const inspectionQuery = new Parse.Query('Inspection');
          inspectionQuery.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': team.id},);
          promises1.push(userRelation.query().count());
          promises2.push(inspectionQuery.count());
          teams.push(team);
        });
      })
      .then(() => Promise.all(promises1))
      .then((results) => {
        results.map((numUsers, index) => {
          teams[index].numUsers = numUsers;
        });
        return Promise.all(promises2);
      })
      .then((results) => {
        results.map((numInspections, index) => {
          teams[index].numInspections = numInspections;
        });
        self.loadingService.showLoading(false, key);
        resolve(teams);
      })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      });
    });
  }

  archiveTeam(team): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(team.id, {
        success: function (team) {
          team.set('isActive', false);
          team.save(null, { useMasterKey: true }).then(object => {
            self.loadingService.showLoading(false, key);
            resolve(object);
          })
          .catch((error) => {
            self.loadingService.showLoading(false, key);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      });
    });
  }

  unArchiveTeam(team): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Team');
      query.get(team.id, {
        success: function (team) {
          team.set('isActive', true);
          team.save(null, { useMasterKey: true }).then(object => {
            self.loadingService.showLoading(false, key);
            resolve(object);
          })
          .catch((error) => {
            self.loadingService.showLoading(false, key);
            reject(error);
          });
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          reject(error);
        }
      });
    });
  }

  getReports() {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.equalTo('adminId', this.user.id);
      query.find({
        success: function(results) {
          if (!results.length) {
            results = [results];
          }
          self.loadingService.showLoading(false, key);
          resolve (results);
        },
        error: function(error) {
          self.loadingService.showLoading(false, key);
          reject (error);
        }
      });
    });
  }

  getInspector(inspectorId: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query('User')
      userQuery.equalTo('objectId', inspectorId);
      userQuery.first({
        success: function(result) {
          const inspector = parseUserToModel(result);
          self.loadingService.showLoading(false, key);
          resolve (inspector);
        },
        error: function(error) {
          self.loadingService.showLoading(false, key);
          reject (error);
        }
      });
    });
  }

  getArchivedReport(page=0): Promise<Inspection[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);

    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      const queryCount = new Parse.Query('Inspection');

      const reports = [];
      const promises = [];
      const inspections = [];
      const access = this.user.get('access');
      if (access && !access.hasOwnProperty('isSuperAdmin')) {
        query.equalTo('adminId', this.user.id);
        queryCount.equalTo('adminId', this.user.id);
      }
      queryCount.equalTo('isActive',false);
      query.equalTo('isActive', false);
      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
        });
      }

      query.find().then((results) => {
          results.forEach((object) => {
            inspections.push(parseInspectionToModel(object));
            promises.push(this.getInspector(object.get('userId')));
          });
        })
        .then(() => Promise.all(promises))
        .then((results) => {
          results.map((inspector, index) => {
            inspections[index].inspector = inspector;
          });
          self.loadingService.showLoading(false, key);
          resolve(reports);
        })
        .catch((error) => {
          self.loadingService.showLoading(false, key);
          reject(error);
        });
    });
  }

  archiveReport(report) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(report.id, {
        success: function (report) {
          report.set('isActive', false);
          report.save();
          self.loadingService.showLoading(false, key);
          resolve(report);
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          resolve(error);
        }
      });
    });
  }

  unArchiveReport(report) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(report.id, {
        success: function (report) {
          report.set('isActive', true);
          report.save();
          self.loadingService.showLoading(false, key);
          resolve(report);
        },
        error: function (object, error) {
          self.loadingService.showLoading(false, key);
          resolve(error);
        }
      });
    });
  }


  getTeamMembers(teamId: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
        const query = new Parse.Query('Team');
        const users: Array<BasicUser> = [];
        const promises = [];
        query.equalTo('objectId', teamId);
        query.first()
        .then((team) => {
          team.get('users').query().find().then((results) => {
             results.forEach((user) => {
                users.push(
                  parseUserToModel(user)
                );
             });
             self.loadingService.showLoading(false, key);
             resolve(users);
          });
        })
        .catch((error) => {
          self.loadingService.showLoading(false, key);
          reject (error);
        });
    });
  }

  addUsersToTeam(teamId: string, usersIds: Array<string>) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
            self.loadingService.showLoading(false, key);
            resolve(obj);
          },
          error: function(error) {
            self.loadingService.showLoading(false, key);
              reject (error);
          }
      });
    });
  }

  removeMemberFromTeam(teamId: string, userId: string) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
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
            self.loadingService.showLoading(false, key);
            resolve(obj);
          },
          error: function(error) {
            self.loadingService.showLoading(false, key);
              reject (error);
          }
      });
    });
  }

  updateReportPermission(reportId: string, permission: boolean) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const report = Parse.Object.extend('Inspection');
      const reportObject = report.createWithoutData(reportId);
      reportObject.set('viewOnly', permission);
      reportObject.save().then(() => {
        self.loadingService.showLoading(false, key);
        resolve(reportObject);
      }).catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      });
    });
  }

}
