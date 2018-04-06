import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

require('es6-promise').polyfill();
require('isomorphic-fetch');


const Parse: any = require('parse');

const init = () => {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
};


fetch('/env').then((res) => {
  if (!res.ok) {
    return Promise.reject(res);
  } 
  return res.json();
}).then((env) => {
  if (env.production) {
    enableProdMode();
  }
  Parse.initialize(env.parseId, env.parseKey);
  Parse.serverURL = env.parseURL;
  Parse.masterKey = env.parseMasterKey;
  environment.parseId = env.parseId;
  environment.parseKey = env.parseKey; 
  environment.parseURL = env.parseURL;
  environment.parseMasterKey = env.parseMasterKey;
  environment.googleStaticMapApiKey = env.googleStaticMapApiKey;
  init();
}).catch((error) => {
  if (environment.production) {
    enableProdMode();
  }
  Parse.initialize(environment.parseId, environment.parseKey);
  Parse.serverURL = environment.parseURL;
  Parse.masterKey = environment.parseMasterKey;
  init();
});
