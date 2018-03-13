import { environment } from '../environments/environment';
import { Injectable} from '@angular/core';
import {Team} from '../models/team.model';

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
        query.equalTo('users', this.user);
        query.equalTo('objectId', teamId);
        query.first({
            success: function(obj) {
                const team = new Team(
                    obj.id,
                    obj.get('name'),
                    obj.get('teamAdmin.id')
                );
                resolve(team);
            },
            error: function(error) {
                reject (error);
            }
        });
    });
  }
}


