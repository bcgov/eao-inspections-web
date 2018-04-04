import { Injectable} from '@angular/core';

import { LoadingService } from './loading.service';
import { Team } from '../models/team.model';
import { parseTeamToModel, parseUserToModel } from './parse.service';
import { randomKey } from './testing.service';

const Parse: any = require('parse');
let self;

@Injectable()
export class TeamService {
  user = new Parse.User();
  constructor(private loadingService: LoadingService) {
      self = this;
  }

  getTeam(teamId: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve) => {
        const query = new Parse.Query('Team');
        query.equalTo('objectId', teamId);
        query.first().then(teamObject => {
          const team = parseTeamToModel(teamObject);
          const adminId = teamObject.get('teamAdmin') ? teamObject.get('teamAdmin').id : null;
          const userQuery = new Parse.Query(Parse.User);
          if (adminId) {
            userQuery.get(adminId).then((admin) => {
              team.admin = parseUserToModel(admin);
              self.loadingService.showLoading(false, key);
              resolve(team);
            }, () => {
              self.loadingService.showLoading(false, key);
              resolve(team);
            })
          }
          else {
            team.admin = null;
            self.loadingService.showLoading(false, key);
            resolve(team);
          }
        });
    });
  }
}


