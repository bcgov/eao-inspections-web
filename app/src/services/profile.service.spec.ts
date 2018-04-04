import { async, TestBed } from '@angular/core/testing';

import {Observable} from 'rxjs/Observable'

import {LoadingService} from './loading.service';
import { ProfileService } from './profile.service';
import {createUser, deleteUser, parseInit} from './testing.service';

const Parse: any = require('parse');
parseInit();

describe('Authentication and Authorization Testing', () => {
  let service: ProfileService;
  let originalTimeout;
  let loadingServiceStub: any;
  let testSuperAdminObject;

  beforeEach(async(() => {
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading():Observable<any> {
        return Observable.of(true);
      },
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: LoadingService, useValue: loadingServiceStub },
        ProfileService]
    })
      .compileComponents();
  }));

  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    createUser('superadmin').then((user) => {
      testSuperAdminObject = user;
      Parse.User.logIn(testSuperAdminObject.username, testSuperAdminObject.key).then(() => {
        done();
      });
    });
  });

  beforeEach(() => {
    service = TestBed.get(ProfileService);
  });

  afterAll((done) => {
    deleteUser(testSuperAdminObject.user.id).then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      done();
    });
  });

  it('should get team', (done) => {
    service.getTeams().then((object) => {
      expect(object).toBeTruthy();
      done();
    });
  });

  it('should get teamAdmin', (done) => {
    service.getTeamAdminInfo().then((object) => {
      expect(object).toBeTruthy();
      done();
    });
  });

});
