import { environment } from '../environments/environment';
import { Injectable} from '@angular/core';
import {Team} from '../models/team.model';
import { parseTeamToModel } from './parse.service';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;
Parse.masterKey = environment.parseMasterKey;

@Injectable()
export class TeamService {
  user = new Parse.User();
  constructor() {
    this.user = Parse.User.current();
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


