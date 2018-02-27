import { Injectable} from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import * as Route from '../constants/routes';

const Parse: any = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

export function parseToJSON(objectList) {
  const listJSON = [];
  if (objectList.length) {
    objectList.forEach((object) => {
      console.log(object);
      listJSON.push(object.toJSON());
    });
  }
  console.log(listJSON);
  return listJSON;
}
