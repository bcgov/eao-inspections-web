import { async, TestBed } from '@angular/core/testing';

import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';

import { AuthService } from './auth.service';
import {createUser, deleteUser, parseInit} from './testing.service';

const Parse: any = require('parse');
parseInit();

describe('Authentication and Authorization Testing', () => {
  let service: AuthService;
  let toastServiceStub: any;
  let originalTimeout;
  let testUserObject;
  beforeEach(async(() => {
    toastServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: ToastrService, useValue: toastServiceStub },
        AuthService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AuthService);
  });

  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    createUser().then(object => {
      testUserObject = object;
      done();
    });
  });

  afterEach((done) => {
    if (Parse.User.current()) {
      Parse.User.logOut().then(() => {
        done();
      });
    } else {
      done();
    }
  });

  afterAll((done) => {
    if (testUserObject.user) {
      deleteUser(testUserObject.user.id)
        .then(() => {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
          done();
        });
    } else {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      done();
    }
  });

  it('should login', (done) => {
    service.logIn(testUserObject.username, testUserObject.key).then(() => {
      expect(service.isAuthenticated()).toBeTruthy();
      done();
    });
  });

  it('should logout', (done) => {
    service.logIn(testUserObject.username, testUserObject.key).then(() => {
      service.logOut().then(() => {
        expect(service.isAuthenticated()).toBeFalsy();
        done();
      });
    });
  });

});
