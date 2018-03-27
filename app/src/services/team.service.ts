import { Injectable} from '@angular/core';

import { parseTeamToModel } from './parse.service';
import { Team } from '../models/team.model';

let Parse: any = require('parse');

@Injectable()
export class TeamService {
  user = new Parse.User();
  constructor() {
  }

  getTeam(teamId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const query = new Parse.Query('Team');
        query.equalTo('objectId', teamId);
        query.first({
            success: function(obj) {
                const team = parseTeamToModel(obj);
                resolve(team);
            },
            error: function(error) {
                reject (error);
            }
        });
    });
  }
}


