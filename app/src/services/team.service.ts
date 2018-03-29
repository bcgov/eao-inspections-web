import { Injectable} from '@angular/core';

import { parseTeamToModel, parseUserToModel } from './parse.service';
import { LoadingService } from './loading.service';
import { Team } from '../models/team.model';
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
    return new Promise((resolve, reject) => {
        const query = new Parse.Query('Team');
        query.equalTo('objectId', teamId);
        query.first({
            success: function(obj) {
                const team = parseTeamToModel(obj);
                self.loadingService.showLoading(false, key);
                const adminId = obj.get('teamAdmin').id;
                const userQuery = new Parse.Query('User');
                userQuery.get(adminId).then((admin) => {
                    team.admin = parseUserToModel(admin);
                    resolve(team);
                }).catch((error) => {
                    resolve(team);
                });
            },
            error: function(error) {
                self.loadingService.showLoading(false, key);
                reject (error);
            }
        });
    });
  }
}


