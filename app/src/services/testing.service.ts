import {environment} from '../environments/environment';

const Parse = require('parse');

export function parseInit() {
  Parse.initialize(environment.parseId, environment.parseKey);
  Parse.serverURL = environment.parseURL;
  Parse.masterKey = environment.parseMasterKey;
}

export function createTeam(name) {
  return new Promise(function(resolve, reject) {
    const teamTemp = new Parse.Object('Team');
    teamTemp.set('name', name);
    console.log('creating team: ' + name);
    teamTemp.save(null, {
      success: function (team) {
        resolve(team);
      },
      error: function () {
        return(resolve());
      }
    });
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
        resolve(obj);
      },
      error: function () {
        return(resolve());
      }
    });
  });
}

export function createObservation(title) {
  return new Promise(function(resolve, reject) {
    const temp = new Parse.Object('Observation');
    temp.set('title', title);
    console.log('creating Observation: ' + title);
    temp.save(null, {
      success: function (obj) {
        resolve(obj);
      },
      error: function () {
        return(resolve());
      }
    });
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

export function deleteUser(userId) {
  return new Promise(function(resolve, reject) {
    const q = new Parse.Query(Parse.User);
    q.get(userId).then(function (userObject) {
      userObject.destroy({useMasterKey: true}).then(() => {
        console.log('User deleted...');
        resolve();
      }, error => {
        reject(error);
      });
    });
  });
}


export function randomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}
