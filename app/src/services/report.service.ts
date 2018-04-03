import { Injectable} from '@angular/core';

import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { LoadingService } from './loading.service';

import { Inspection } from '../models/inspection.model';
import { Observation } from '../models/observation.model';
import { Team } from '../models/team.model';
import { parseUserToModel, parseInspectionToModel, parseObservationToModel, parseMediaToModel } from './parse.service';
import { randomKey } from './testing.service';

const FileSaver = require('file-saver');
const Parse: any = require('parse');
let self;

@Injectable()
export class ReportService {
  user = new Parse.User();
  page = 0;
  totalPages = 0;
  displayLimit = 25;
  constructor(private loadingService: LoadingService) {
    self = this;
    this.user = Parse.User.current();
  }

  getInspector(inspectorId: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const userQuery = new Parse.Query(Parse.User);
      userQuery.equalTo('objectId', inspectorId);
      userQuery.first({
        success: function(result) {
          const inspector = parseUserToModel(result);
           self.loadingService.showLoading(false, key);
           resolve (inspector);
        },
        error: function(error) {
          self.loadingService.showLoading(false, key);
          reject (error);
        }
      });
    });
  }

  getMyReports(page=0): Promise<any[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const reports = [];
      const promises = [];
      const queryCount = new Parse.Query('Inspection');
      queryCount.equalTo('isActive', true);
      queryCount.equalTo('userId', this.user.id);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
        });
      }
      this.page = page;
      const query = new Parse.Query('Inspection');
      query.equalTo('isActive', true);
      query.equalTo('userId', this.user.id);
      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      query.find()
      .then((results) => {
        if (!Array.isArray(results)) {
          results = [results];
        }

        results.forEach((object) => {
          reports.push(parseInspectionToModel(object));
          promises.push(this.getInspector(object.get('userId')));
        });
      })
      .then(() => Promise.all(promises))
      .then((results) => {
        results.map((inspector, index) => {
          reports[index].inspector = inspector;
        });
        self.loadingService.showLoading(false, key);
        resolve(reports);
      })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      });
    });
  }

  getActiveTeamReports(teamId: string, page=0): Promise<any[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const reports = [];
      const promises = [];
      const queryCount = new Parse.Query('Inspection');
      queryCount.equalTo('isActive',true);
      queryCount.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': teamId },);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
        });
      }
      this.page = page;
      const q = new Parse.Query('Inspection');
      q.equalTo('team', { '__type': 'Pointer', 'className': 'Team', 'objectId': teamId },);
      q.equalTo('isActive', true);
      q.skip(page * this.displayLimit);
      q.limit(this.displayLimit);
      q.descending('createdAt');
      q.find()
        .then((results) => {
          if (!Array.isArray(results)) {
            results = [results]
          }

          results.forEach((object) => {
            reports.push(parseInspectionToModel(object));
            promises.push(this.getInspector(object.get('userId')));
          });
        })
        .then(() => Promise.all(promises))
        .then((results) => {
          results.map((inspector, index) => {
            reports[index].inspector = inspector;
          });
          self.loadingService.showLoading(false, key);
          resolve(reports);
        })
        .catch((error) => {
          self.loadingService.showLoading(false, key);
          reject(error);
        });
    });
  }

  getInspection(inspectionId: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query1 = new Parse.Query('Inspection');
      query1.equalTo('objectId', inspectionId);
      const query2 = new Parse.Query('Inspection');
      query2.equalTo('id', inspectionId);
      const orQuery = new Parse.Query.or(query1, query2);

      orQuery.first().then((object) => {
        this.getInspector(object.get('userId'))
        .then((inspector) => {
            const inspection = parseInspectionToModel(object);
            inspection.inspector = inspector;
            self.loadingService.showLoading(false, key);
            resolve(inspection);
        });
      })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      });
    });
  }

  getObservations(inspectionId: string, page = 0): Promise<any[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const elements = [];
      let elementList;
      const inspection = new Parse.Object.extend('Inspection');
      const tempInspection = new inspection();
      tempInspection.id = inspectionId;
      const queryCount = new Parse.Query('Observation');
      queryCount.equalTo('inspection', tempInspection);
      if (this.page === 0) {
        queryCount.count().then((count) => {
          this.totalPages = Math.ceil(count / this.displayLimit);
        });
      }
      this.page = page;
      const query = new Parse.Query('Observation');

      query.equalTo('inspection', tempInspection);
      query.skip(page * this.displayLimit);
      query.limit(this.displayLimit);
      query.descending('createdAt');
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          elementList = results;
          elementList.forEach((object) => {
            elements.push(parseObservationToModel(object));
          });
          self.loadingService.showLoading(false, key);
          resolve(elements);
        },
        error: function(error) {
          self.loadingService.showLoading(false, key);
          reject (error);
        }
      });
    });
  }

  getObservation(observationId: string): Promise<any> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      const query = new Parse.Query('Observation');
      let observationModelObj: Observation;
      query.equalTo('objectId', observationId);
      query.first().then((object) => {
        observationModelObj = parseObservationToModel(object);
        object.get('inspection').fetch().then((inspObj) => {
          observationModelObj.viewOnly = inspObj.get('viewOnly');
        }, (error) => {
          self.loadingService.showLoading(false, key);
          reject(error);
        }).then(() => {
          self.loadingService.showLoading(false, key);
          resolve(observationModelObj);
        });
      }, (error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      })
    });
  }

  getMedia(observationId: string, type='Photo'): Promise<any[]> {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    const photos = [];
    let photoList;
    const observationQuery = new Parse.Object.extend('Observation');
    const tempObservation = new observationQuery();
    tempObservation.id = observationId;

    return new Promise((resolve, reject) => {
      const query = new Parse.Query(type);
      query.equalTo('observation', tempObservation);
      query.find({
        success: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          photoList = results;
          photoList.forEach((object) => {
            photos.push(parseMediaToModel(object, type));
          });
          self.loadingService.showLoading(false, key);
          resolve(photos);
        },
        error: function(error) {
          self.loadingService.showLoading(false, key);
          reject (error);
        }
      });
    });
  }

  download(report: Inspection) {
    const key = randomKey();
    self.loadingService.showLoading(true, key);
    return new Promise((resolve, reject) => {
      let promises = [];
      const observationFolders = {};
      const medias = [];

      const zip = new JSZip();
      const reportFolder = zip.folder(report.title);
      reportFolder.file('report.txt', report.toText());
      this.getObservations(report.id).then((observations) => {
        observations.forEach(observation => {
          const observationFolder = reportFolder.folder(observation.title);
          observationFolders[observation.id] = observationFolder;
          observationFolder.file('info.txt', observation.toText());

          promises.push(this.getMedia(observation.id, 'Photo'));
          promises.push(this.getMedia(observation.id, 'Video'));
          promises.push(this.getMedia(observation.id, 'Audio'));
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
        if (medias.length == 0) {
          zip.generateAsync({type:'blob'})
          .then(function(content) {
              FileSaver.saveAs(content, report.title + '.zip');
              self.loadingService.showLoading(false, key);
              resolve(true);
          });
        } else {
          let count = 0;
          medias.forEach((media) => {
            console.log(media);
            const folder = observationFolders[media.observationId];
            const mediaFolder = folder.folder(media.id);

            mediaFolder.file('info.txt', media.toText());

            JSZipUtils.getBinaryContent(media.fileURL, function (err, data) {
              mediaFolder.file(media.fileName, data, {binary: true});

              if(err) {
                reject(err);
              }

              count++;
              if (count === medias.length) {
                zip.generateAsync({type: 'blob'})
                .then(function(content) {
                    FileSaver.saveAs(content, report.title + '.zip');
                    self.loadingService.showLoading(false, key);
                    resolve(true);
                });
              }
            });
          });
        }
      })
      .catch((error) => {
        self.loadingService.showLoading(false, key);
        reject(error);
      });
    });
  }
}
