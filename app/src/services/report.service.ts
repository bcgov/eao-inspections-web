import { Injectable} from '@angular/core';

import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';

import { Inspection } from '../models/inspection.model';
import { Observation } from '../models/observation.model';
import { Team } from '../models/team.model';
import { parseUserToModel, parseInspectionToModel, parseObservationToModel, parseMediaToModel } from './parse.service';

const FileSaver = require('file-saver');
const Parse: any = require('parse');

@Injectable()
export class ReportService {
  user = new Parse.User();

  constructor() {
    this.user = Parse.User.current();
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
      console.log(this.user.id);

      query.equalTo('userId', this.user.id);
      query.ascending('createdAt');
      query.find({
        success: function (results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          console.log(results);
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
      const query1 = new Parse.Query('Inspection');
      query1.equalTo('objectId', inspectionId);
      const query2 = new Parse.Query('Inspection');
      query2.equalTo('id', inspectionId);
      const orQuery = new Parse.Query.or(query1, query2);

      orQuery.first().then((object) => {
        console.log("getInsepction", object);
        this.getInspector(object.get('userId'))
        .then((inspector) => {
          console.log(inspector);
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
          elements.push(parseObservationToModel(object));
        });
      }).then(() => {
        resolve(elements);
      });
    });
  }

  getObservation(observationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query1 = new Parse.Query('Observation');
      query1.equalTo('objectId', observationId);
      const query2 = new Parse.Query('Observation');
      query2.equalTo('id', observationId);
      const orQuery = new Parse.Query.or(query1, query2);

      orQuery.first().then((object) => {
        resolve(parseObservationToModel(object));
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
          photos.push(parseMediaToModel(object));
        });
      }).then(() => {
        resolve(photos);
      });
    });
  }

  download(report: Inspection) {
    return new Promise((resolve, reject) => {
      let promises = [];
      const observationFolders = {};
      const medias = [];

      const zip = new JSZip();
      const reportFolder = zip.folder(report.title);
      reportFolder.file('report.txt', report.toText());
      console.log(report.toText());
      this.getObservations(report.id).then((observations) => {
        observations.forEach(observation => {
          const observationFolder = reportFolder.folder(observation.title);
          observationFolders[observation.id] = observationFolder;
          observationFolder.file('info.txt', observation.toText());

          promises.push(this.getPhotos(observation.id));
        });
      })
      .then(() => Promise.all(promises))
      .then((results) => {
        promises = [];
        results.forEach((res) => {
          res.forEach(media => {
            medias.push(media);
          });
        });
      })
      .then(() => {
        let count = 0;
        if (medias.length == 0) {
          zip.generateAsync({type:'blob'})
          .then(function(content) {
              FileSaver.saveAs(content, report.title + '.zip');
              resolve(true);
          });
        } else {
          medias.forEach((media) => {
            const folder = observationFolders[media.observationId];
            const mediaFoler = folder.folder(media.id);

            mediaFoler.file('info.txt', media.toText());

            JSZipUtils.getBinaryContent(media.fileURL, function (err, data) {
              mediaFoler.file(media.fileName, data, {binary:true});

              count++;
              if (count === medias.length) {
                zip.generateAsync({type:'blob'})
                .then(function(content) {
                    FileSaver.saveAs(content, report.title + '.zip');
                    resolve(true);
                });
              }
            });
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
