import { environment } from '../environments/environment';
import { Injectable} from '@angular/core';
import {Team} from '../models/team.model';
import { parseTeamToModel } from './parse.service';

let Parse: any = require('parse');

@Injectable()
export class ProfileService {
  user = new Parse.User();
  
  constructor() {
     this.user = Parse.User.current();
  }

  getUser(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.user);
    });
  }

  getTeams(): Promise<any[]> {
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
          reject (error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(teams);
        });
      });
    });
  }

  getTeamAdminInfo(): Promise<any> {
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
          reject (error.message);
        }
      }).then(() => {
        Promise.all(promises).then(() => {
          resolve(admins);
        });
      });
    });
  }
  updateProfileImage(image): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(image);
      console.log(this.user);
      const promises = [];
      const parseFile = new Parse.File('profile_image_' + this.user.id, image, image.type);
      parseFile.save().then((objectFile) => {
        this.user.set('profileImage', objectFile);
        promises.push(this.user.save());
      }).then(imageObject => {
        Promise.all(promises).then(() => {
          resolve(imageObject);
        }, error => {
          reject(error);
        });
      });
    });
  }
}


