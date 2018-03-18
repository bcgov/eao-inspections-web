import { environment } from '../environments/environment';
import { Team } from '../models/team.model';
import { BasicUser } from '../models/user.model';
import { Inspection } from '../models/inspection.model';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;
Parse.masterKey = environment.parseMasterKey;

export function parseToJSON(objectList) {
  const listJSON = [];
  if (objectList.length) {
    objectList.forEach((object) => {
      listJSON.push(object.toJSON());
    });
  }
  return listJSON;
}

export function getObject(userObject) {
  return new Promise((resolve, reject) => {
    userObject.fetch().then((obj) => {resolve(obj); });
  });
}

export function parseUserToModel(object): BasicUser {
  if (object) {
    return new BasicUser(
      object.id,
      object.get('firstName'),
      object.get('lastName'),
      object.get('firstName') + ' ' + object.get('lastName'),
      [],
      object.get('publicEmail'),
      object.get('profile_image'),
      object.get('isAdmin'),
      object.get('isSuperAdmin'),
      object.get('permission')
    );
  }
}

export function parseTeamToModel(object) {
  return new Team (
    object.id,
    object.get('name'),
    object.get('teamAdmin'),
    object.get('color'),
    object.get('isActive'),
    object.get('badge')
  );
}

export function parseInspectionToModel(object) {
  let team = object.get('team');

  if (team) {
    team = parseTeamToModel(team);
  }

  return new Inspection(
    object.id,
    object.get('title'),
    object.get('subtitle'),
    object.get('inspectionNumber'),
    null,
    object.get('project'),
    object.get('startDate'),
    object.get('endDate'),
    object.get('updatedAt'),
    object.get('requirement'),
    object.get('isSubmitted'),
    team
  );
}
