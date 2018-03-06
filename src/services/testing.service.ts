import {environment} from '../environments/environment';

const Parse = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

export function createTeam(name) {
  return new Promise(function(resolve, reject) {
    const teamTemp = new Parse.Object('Team');
    teamTemp.set('name', name);
    console.log('creating team: ' + name);
    teamTemp.save(null, {
      success: function (team) {
        console.log(team);
      },
      error: function () {
        return(resolve());
      }
    }).then(function(object){ return resolve(object) });
  });
}

export function createInspection(title, adminId) {
  return new Promise(function(resolve, reject) {
    const temp = new Parse.Object('Inspection');
    temp.set('title', title);
    temp.set('adminId', adminId);
    console.log('creating Inpsection: ' + title);
    temp.save(null, {
      success: function (obj) {
        console.log(obj);
      },
      error: function () {
        return(resolve());
      }
    }).then(function(object) { return resolve(object); });
  });
}

export function createObservation(title) {
  return new Promise(function(resolve, reject) {
    const temp = new Parse.Object('Observation');
    temp.set('title', title);
    console.log('creating Observation: ' + title);
    temp.save(null, {
      success: function (obj) {
        console.log(obj);
      },
      error: function () {
        return(resolve());
      }
    }).then(function(object){ return resolve(object) });
  });
}

export function deleteInspections(inspName) {
  return new Promise(function(resolve, reject) {
    const q = new Parse.Query('Inspection');
    q.equalTo('title', inspName);
    q.find().then(function (obj) {
      Parse.Object.destroyAll(obj).then(function () {
        console.log('Inspections deleted... ');
        resolve();
      });
    });
  });
}

export function deleteObservations(obsName) {
  return new Promise(function(resolve, reject) {
    const q = new Parse.Query('Observation');
    q.equalTo('title', obsName);
    q.find().then(function (obj) {
      Parse.Object.destroyAll(obj).then(function () {
        console.log('Observations deleted... ');
        resolve();
      });
    });
  });
}

export function deleteTeam(teamName) {
  return new Promise(function(resolve, reject) {
    const q = new Parse.Query('Team');
    q.equalTo('name', teamName);
    q.find().then(function (teams) {
      Parse.Object.destroyAll(teams).then(function () {
        console.log('Teams deleted... ');
        resolve();
      });
    });
  });
}
