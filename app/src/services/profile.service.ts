import { Injectable} from '@angular/core';

import { parseTeamToModel, parseUserToModel } from './parse.service';
import { LoadingService } from './loading.service';
import { randomKey } from './testing.service';

const Parse: any = require('parse');
let self;

@Injectable()
export class ProfileService {
  user = new Parse.User();
  page = 0;
  totalPages = 0;
  displayLimit = 25;
  constructor(private loadingService: LoadingService) {
     self = this;
     this.user = Parse.User.current();
  }

  getTeams(page=0): Promise<any[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const promises1 = [];
      const promises2 = [];
      const teams = [];
      const queryCount = new Parse.Query('Team');
      queryCount.equalTo('users', this.user);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
        });
      }
      this.page = page;
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
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

  getTeamAdminInfo(): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const admins = [];
      const promises = [];
      const query = new Parse.Query('Team');
      query.equalTo('users', this.user);
      query.find()
      .then((results) => {
        if (!Array.isArray(results)) {
          results = [results];
        }
        results.forEach((object) => {
          promises.push(object.get('teamAdmin').fetch());
          admins.push(parseTeamToModel(object));
        });
      })
      .then(() => Promise.all(promises))
      .then((results) => {
        results.map((admin, index) => {
          admins[index]['admin'] = parseUserToModel(admin);
        });
        self.loadingService.showLoading(false, key);
        resolve(admins);
      })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject (error);
      });
    });
  }

  updateProfileImage(image): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const promises = [];
      const parseFile = new Parse.File('profile_image_' + this.user.id, image, image.type);
      parseFile.save().then((objectFile) => {
        this.user.set('profileImage', objectFile);
        promises.push(this.user.save());
      }).then(imageObject => {
        Promise.all(promises).then(() => {
          self.loadingService.showLoading(false, key);
          resolve(imageObject);
        }, error => {
          self.loadingService.showLoading(false, key);
          reject(error);
        });
      });
    });
  }
}


