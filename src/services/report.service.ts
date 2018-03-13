import { Injectable} from '@angular/core';

import { environment } from '../environments/environment';
import { Team } from '../models/team.model';
import { Inspection } from '../models/inspection.model';
import {Observation} from '../models/observation.model';
import {Media} from '../models/media.model';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

@Injectable()
export class ReportService {
  user = new Parse.User();
  constructor() {
    this.user = Parse.User.current();
  }

  getMyReports(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reports = [];
      let resultList;
      const query = new Parse.Query('Inspection');
      query.equalTo('userId', this.user.id);
      query.ascending('createdAt');
      query.find({
        success: function (results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          resultList = results;
        },
        error: function (error) {
          reject(error.message);
        }
      }).then(() => {
        resultList.forEach((object) => {
          reports.push(new Inspection(
            object.id,
            object.get('title'),
            object.get('subtitle'),
            object.get('inspectionNumber'),
            this.user.get('firstName') + ' ' + this.user.get('lastName'),
            object.get('project'),
            object.get('startDate'),
            object.get('endDate'),
            object.get('requirement'),
            object.get('submitted'),
            object.get('team.name')
            )
          );
        });
      }).then(() => {
        resolve(reports);
      });
    });
  }

  getTeamReports(teamId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const teamQuery = new Parse.Query('Team');
      teamQuery.equalTo('id', teamId);
      const q = new Parse.Query('Inspection');
      q.matchesKeyInQuery('teamId', 'teamId', teamQuery, {
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          resolve (results);
        },
        error: function(error) {
          reject (error.message);
        }
      });
    });
  }

  getInspection(inspectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(inspectionId).then((object) => {
        const tempUserId = object.get('userId');
        let tempInspectorName;
        const userQuery = new Parse.Query(Parse.User);
        userQuery.get(tempUserId).then((userObject) => {
          tempInspectorName = userObject.get('firstName') + ' ' + userObject.get('lastName');
        }).then(() => {
          resolve(new Inspection(
            object.id,
            object.get('title'),
            object.get('subtitle'),
            object.get('inspectionNumber'),
            tempInspectorName,
            object.get('project'),
            object.get('startDate'),
            object.get('endDate'),
            object.get('requirement'),
            object.get('submitted'),
            object.get('team.name')
          ));
        });

      }, (error) => {
        reject(error.message);
      });
    });
  }

  getObservations(inspectionId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const elements = [];
      let elementList;
      const query = new Parse.Query('Observation');
      query.equalTo('inspectionId', inspectionId);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          elementList = results;
        },
        error: function(error) {
          reject (error.message);
        }
      }).then(() => {
        elementList.forEach((object) => {
          elements.push(new Observation(
            object.id,
            object.get('title'),
            object.get('observationDescription'),
            object.get('requirement'),
            object.get('coordinate'),
            object.get('media'),
            object.get('createdAt')
          ));
        });
      }).then(() => {
        resolve(elements);
      });
    });
  }

  getObservation(observationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Observation');
      query.get(observationId).then((object) => {
        resolve(
          new Observation(
            object.id,
            object.get('title'),
            object.get('observationDescription'),
            object.get('requirement'),
            object.get('coordinate'),
            object.get('media'),
            object.get('createdAt')
          )
        );
      }, (error) => {
        reject(error.messsage);
      });
    });
  }

  getPhotos(observationId: string): Promise<any[]> {
    const photos = [];
    let photoList;
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Photo');
      query.equalTo('observationId', observationId);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          photoList = results;
        },
        error: function(error) {
          reject (error.message);
        }
      }).then(() => {
        photoList.forEach((object) => {
          photos.push(new Media(
            object.id,
            'img',
            object.get('caption'),
            object.get('observationId'),
            object.get('coordinate'),
            object.get('file').url(),
            object.get('createdAt')
          ));
        });
      }).then(() => {
        resolve(photos);
      });
    });
  }
}

