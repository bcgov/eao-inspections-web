import { async, TestBed } from '@angular/core/testing';

import {Observable} from 'rxjs/Observable';

import {LoadingService} from './loading.service';
import { TeamService } from './team.service';
import {createTeam, deleteTeam, parseInit} from './testing.service';

const Parse: any = require('parse');
parseInit();

describe('Team Service Testing', () => {
  let service: TeamService;
  let originalTimeout;
  let test_team;
  let loadingServiceStub: any;

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
        TeamService
      ],
    })
      .compileComponents();
  }));


  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    Parse.User.logIn('superadmin@superadmin.com', 'password')
      .then(() => {
        createTeam('test_team')
          .then(object => {
            test_team = object;
            done();
          });
      });
  });

  beforeEach(() => {
    service = TestBed.get(TeamService);
  });

  afterAll((done) => {
    Parse.User.logOut().then(() => {
      deleteTeam(test_team.get('name'))
        .then(() => {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
          done();
        });
    });
  });

  it('should get team', (done) => {
    service.getTeam(test_team.id).then((object) => {
      expect(object.id === test_team.id).toBeTruthy();
      done();
    });
  });

});
