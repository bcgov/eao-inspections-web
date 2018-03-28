import { BasicUser } from '../models/user.model';
import { Inspection } from '../models/inspection.model';
import { Media } from '../models/media.model';
import { Observation } from '../models/observation.model';
import { Team } from '../models/team.model';

const Parse: any = require('parse');

export function parseToJSON(objectList) {
  const listJSON = [];
  if (objectList.length) {
    objectList.forEach((object) => {
      listJSON.push(object.toJSON());
    });
  }
  return listJSON;
}

export function parseUserToModel(object): BasicUser {
  if (object) {
    let profileImage = object.get('profileImage');
    if (profileImage) {
      const url = profileImage.url();
      const n = url.indexOf('/parse/');
      profileImage = Parse.serverURL + url.substring(n + 6);
    }

    return new BasicUser(
      object.id,
      object.get('firstName'),
      object.get('lastName'),
      object.get('firstName') + ' ' + object.get('lastName'),
      [],
      object.get('publicEmail'),
      profileImage,
      object.get('permission'),
      object.get('access'),
      object.get('hasLoggedIn'),
      object.get('isActive'),
    );
  }
}

export function parseTeamToModel(object) {
  let badge = object.get('badge');
  if (badge) {
    const url = badge.url();
    const n = url.indexOf('/parse/');
    badge = Parse.serverURL + url.substring(n + 6);
  }

  return new Team (
    object.id,
    object.get('name'),
    object.get('teamAdmin'),
    object.get('color'),
    object.get('isActive'),
    badge
  );
}

export function parseInspectionToModel(object) {
  let team = object.get('team');

  if (team) {
    team = parseTeamToModel(team);
  }

  const id = (object.get('id')) ? object.get('id') : object.id;

  return new Inspection(
    id,
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

export function parseObservationToModel(object) {
  const id = (object.get('id')) ? object.get('id') : object.id;

  return new Observation(
    id,
    object.get('title'),
    object.get('observationDescription'),
    object.get('requirement'),
    object.get('coordinate'),
    object.get('media'),
    object.get('createdAt')
  );
}

export function parseMediaToModel(object, type = 'Photo') {
  const url = object.get('file').url();
  const n = url.indexOf('/parse/');
  const newUrl = Parse.serverURL + url.substring(n + 6);
  if (object.get('type')) {
    type = object.get('type');
  }
  return new Media(
    object.id,
    type,
    object.get('caption'),
    object.get('observationId'),
    object.get('coordinate'),
    newUrl,
    object.get('file').name(),
    object.get('createdAt'),
  );
}
