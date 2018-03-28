import { Injectable} from '@angular/core';

import { parseTeamToModel } from './parse.service';
import { LoadingService } from './loading.service';
import { Team } from '../models/team.model';

const Parse: any = require('parse');
let self;

@Injectable()
export class TeamService {
  user = new Parse.User();
  constructor(private loadingService: LoadingService) {
      self = this;
  }

  getTeam(teamId: string): Promise<any> {
    self.loadingService.showLoading(true);
    return new Promise((resolve, reject) => {
        const query = new Parse.Query('Team');
        query.equalTo('objectId', teamId);
        query.first({
            success: function(obj) {
                const team = parseTeamToModel(obj);
                self.loadingService.showLoading(false);
                resolve(team);
            },
            error: function(error) {
                self.loadingService.showLoading(false);
                reject (error);
            }
        });
    });
  }
}


