import { environment } from '../environments/environment';
import { Team } from '../models/team.model';
import { BasicUser } from '../models/user.model';
import { Inspection } from '../models/inspection.model';

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
    let image_url;
    if (object.get('profileImage')) {
      image_url = object.get('profileImage').url();
    } else {
      object.fetch().then(
        image_url = object.get('profileImage') ? object.get('profileImage').url() : null
      );
    }
    return new BasicUser(
      object.id,
      object.get('firstName'),
      object.get('lastName'),
      object.get('firstName') + ' ' + object.get('lastName'),
      [],
      object.get('publicEmail'),
      image_url,
      object.get('permission'),
      object.get('access'),
    );
  }
}

export function parseTeamToModel(object) {
  let image_url;
  if (object.get('image')) {
    image_url = object.get('image').url();
  }
  return new Team (
    object.id,
    object.get('name'),
    object.get('teamAdmin'),
    object.get('color'),
    object.get('isActive'),
    image_url
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
    object.get('isActive'),
    team,
    object.get('viewOnly')
  );
}
