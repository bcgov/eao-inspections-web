import { Injectable} from '@angular/core';

import { environment } from '../environments/environment';
import { Team } from '../models/team.model';
import { Inspection } from '../models/inspection.model';
import {Observation} from '../models/observation.model';
import {Media} from '../models/media.model';
import { BasicUser } from '../models/user.model';
import { parseUserToModel, parseInspectionToModel } from './parse.service';

let Parse: any = require('parse');

@Injectable()
export class ReportService {
  user = new Parse.User();

  constructor() {
  }

  getInspector(inspectorId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query('User');
      userQuery.equalTo('objectId', inspectorId);
      userQuery.first({
        success: function(result) {
          const inspector = parseUserToModel(result);
          resolve (inspector);
        },
        error: function(error) {
          reject (error.message);
        }
      });
    });
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
          this.getInspector(object.get('userId'))
          .then((inspector) => {
            const inspection = parseInspectionToModel(object);
            inspection.inspector = inspector;
            reports.push(inspection);
          });
        });
      }).then(() => {
        resolve(reports);
      });
    });
  }

  getTeamReports(teamId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const promises = [];
      const reports = [];
      const q = new Parse.Query('Inspection');
      q.equalTo('team', {'__type': 'Pointer', 'className': 'Team', 'objectId': teamId });
      q.find().then((results) => {
          results.forEach((object) => {
            this.getInspector(object.get('userId'))
            .then((inspector) => {
              const inspection = parseInspectionToModel(object);
              inspection.inspector = inspector;
              reports.push(inspection);
            });
          });
          resolve(reports);
      });
    });
  }

  getActiveTeamReports(teamId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const promises = [];
      const reports = [];
      const q = new Parse.Query('Inspection');
      q.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': teamId },);
      q.equalTo('isActive', true);
      q.find().then((results) => {
        results.forEach((object) => {
          this.getInspector(object.get('userId'))
            .then((inspector) => {
              const inspection = parseInspectionToModel(object);
              inspection.inspector = inspector;
              reports.push(inspection);
            });
        });
        resolve(reports);
      });
    });
  }

  getInspection(inspectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Inspection');
      query.get(inspectionId).then((object) => {
        this.getInspector(object.get('userId'))
        .then((inspector) => {
            const inspection = parseInspectionToModel(object);
            inspection.inspector = inspector;
            resolve(inspection);
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

