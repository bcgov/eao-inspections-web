import { async, TestBed } from '@angular/core/testing';

import {createTeam, deleteTeam, parseInit} from './testing.service';
import { TeamService } from './team.service';
import {Observable} from 'rxjs/Observable';
import {LoadingService} from './loading.service';

const Parse: any = require('parse');
parseInit();

describe('Team Service Testing', () => {
  let service: TeamService;
  let originalTimeout;
  let team1;
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const promises = [];
    Parse.User.logIn('superadmin@superadmin.com', 'password').then((user) => {
      promises.push(createTeam('test_team1').then(object => {
        team1 = object;
      }));
    }).then(() => {
      Promise.all(promises).then(() => {
        done();
      });
    });
  });

  beforeEach(() => {
    service = TestBed.get(TeamService);
  });

  afterAll((done) => {
    const promises = [];
    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      promises.push(deleteTeam(team1.get('name')));
    }).then(() => {
      Promise.all(promises)
        .then(() => {
        console.log('Destruction Complete');
      }).then(() => {
        done();
      });
    });
  });

  it('should get team', () => {
    service.getTeam(team1.id).then((object) => {
      expect(object.id === Parse.User.current().id).toBeTruthy();
    });
  });

});
