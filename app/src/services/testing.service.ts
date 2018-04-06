import {environment} from '../environments/environment';
import * as Access from '../constants/accessRights';

const Parse = require('parse');

export function parseInit() {
  Parse.initialize(environment.parseId, environment.parseKey);
  Parse.serverURL = environment.parseURL;
  Parse.masterKey = environment.parseMasterKey;
}

export function createUser(permission = 'inspector') {
  const randKey = randomKey();
  return new Promise ((resolve, reject) => {
    const userTemp = new Parse.User();
    userTemp.set('isActive', true);
    userTemp.set('firstName', randKey);
    userTemp.set('username', randKey);
    userTemp.set('lastName', randKey);
    userTemp.set('password', randKey);
    userTemp.set('email', randKey + '@fake.com');
    userTemp.set('publicEmail', randKey + '@fake.com');
    userTemp.set('permission', permission);
    if (permission === 'inspector') {
      userTemp.set('access', Access.INSPECTOR);
    } else if (permission === 'admin') {
      userTemp.set('access', Access.ADMIN);
    } else if (permission === 'superadmin') {
      userTemp.set('access', Access.SUPERADMIN);
    } else if (permission === 'manager') {
      userTemp.set('access', Access.MANAGER);
    } else if (permission === 'viewInspector') {
      userTemp.set('access', Access.VIEW_INSPECTOR)
    }
    userTemp.save(null, {useMasterKey: true}).then((user) => {
      resolve({
        'user': user,
        'username': user.get('username'),
        'key': randKey,
      })
      }, error => {
      reject(error);
    });
  })
}

export function createTeam(name) {
  return new Promise(function(resolve, reject) {
    const teamTemp = new Parse.Object('Team');
    teamTemp.set('name', name);
    teamTemp.save().then((teamObj) => {
      resolve(teamObj);
    },(error) => {
      reject(error);
    });
  });
}

export function createInspection(title) {
  return new Promise(function(resolve, reject) {
    const temp = new Parse.Object('Inspection');
    temp.set('title', title);
    temp.save().then((obj) => {
      resolve(obj);
    }, (error) => {
      reject(error);
    });
  });
}

export function createObservation(title) {
  return new Promise(function(resolve, reject) {
    const temp = new Parse.Object('Observation');
    temp.set('title', title);
    temp.save().then((object) => {
      resolve(object);
    }, error => {
      reject(error);
    });
  });
}

export function deleteInspections(inspName) {
  return new Promise(function(resolve) {
    const q = new Parse.Query('Inspection');
    q.equalTo('title', inspName);
    q.find().then(function (obj) {
      Parse.Object.destroyAll(obj).then(() => {
        resolve();
      });
    });
  });
}

export function deleteObservations(obsName) {
  return new Promise(function(resolve) {
    const q = new Parse.Query('Observation');
    q.equalTo('title', obsName);
    q.find().then(function (obj) {
      Parse.Object.destroyAll(obj).then(() => {
        resolve();
      });
    });
  });
}

export function deleteTeam(teamName) {
  return new Promise(function(resolve) {
    const q = new Parse.Query('Team');
    q.equalTo('name', teamName);
    q.find().then(function (teams) {
      Parse.Object.destroyAll(teams).then(() => {
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
