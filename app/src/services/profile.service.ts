import { Injectable} from '@angular/core';

import { parseTeamToModel } from './parse.service';
import { LoadingService } from './loading.service';

const Parse: any = require('parse');
let self;

@Injectable()
export class ProfileService {
  user = new Parse.User();

  constructor(private loadingService: LoadingService) {
     self = this;
     this.user = Parse.User.current();
  }

  getUser(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.user);
    });
  }

  getTeams(): Promise<any[]> {
    self.loadingService.showLoading(true);
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
            const team = parseTeamToModel(object);
            const userRelation = object.relation('users');
            const inspectionQuery = new Parse.Query('Inspection');
            inspectionQuery.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': team.id},);
            userRelation.query().count().then((numUsers) => {
              team.numUsers = numUsers;
              inspectionQuery.count().then((numInspections) => {
                team.numInspections = numInspections;
                promises.push(teams.push(team));
              });
            });
          });
        },
        error: function(error) {
          self.loadingService.showLoading(false);
          reject (error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(teams);
        });
      });
    });
  }

  getTeamAdminInfo(): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const admins = [];
      const promises = [];
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          results.forEach((object) => {
            promises.push(object.get('teamAdmin')
              .fetch()
              .then((obj) => {
                admins.push(
                  {
                    'admin': obj,
                    'team': [parseTeamToModel(object)],
                  }
                );
              })
            );
          });
        },
        error: function(error) {
          self.loadingService.showLoading(false);
          reject (error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(admins);
        });
      });
    });
  }
  updateProfileImage(image): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
      const promises = [];
      const parseFile = new Parse.File('profile_image_' + this.user.id, image, image.type);
      parseFile.save().then((objectFile) => {
        this.user.set('profileImage', objectFile);
        promises.push(this.user.save());
      }).then(imageObject => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false);
          resolve(imageObject);
        }, error => {
          self.loadingService.showLoading(false);
          reject(error);
        });
      });
    });
  }
}


