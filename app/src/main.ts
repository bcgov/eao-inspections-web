import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
const Parse: any = require('parse');

const fetchErrorHandler = (res) => {
  if (!res.ok) {
    return Promise.reject(res);
  } 
  return res;

};

fetch('/env').then(fetchErrorHandler).then((res) => res.json()).then((parseData) => {
  if (environment.production) {
    enableProdMode();
  }
  Parse.initialize(parseData.parseId, parseData.parseKey);
  Parse.serverURL = parseData.parseUrl;
  Parse.masterKey = parseData.parseMasterKey;
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
}).catch((error) => {
  if (environment.production) {
    enableProdMode();
  }
  Parse.initialize(environment.parseId, environment.parseKey);
  Parse.serverURL = environment.parseURL;
  Parse.masterKey = environment.parseMasterKey;
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
});
