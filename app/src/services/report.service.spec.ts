import { async, TestBed } from '@angular/core/testing'

import {Observable} from 'rxjs/Observable';

import {
  createInspection, createObservation, createTeam, createUser, deleteInspections, deleteObservations, deleteTeam, deleteUser,
  parseInit
} from './testing.service';
import { ReportService } from './report.service';
import {LoadingService} from './loading.service';

const Parse: any = require('parse');
parseInit();

describe('Report Testing', () => {
  let service: ReportService;
  let originalTimeout;
  let test_inspection_title = 'test_inspection';
  let test_observation_title = 'test_observation';
  let test_team_name = 'test_team';
  let test_team, test_observation, test_inspection;
  let testSuperAdminObject;
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
        ReportService
      ],
    })
      .compileComponents();
  }));

  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    const promises = [];
    const promises2 = [];
    createUser('superadmin').then(user => {
      testSuperAdminObject = user;
    }).then(() => {
      promises.push(createInspection(test_inspection_title));
      promises.push(createObservation(test_observation_title));
      promises.push(createTeam(test_team_name));
    }).then(() => {
      Promise.all(promises).then(results => {
        results.forEach(result => {
          if(result.get('title') === test_observation_title) {
            test_observation = result;
          } else if (result.get('title') === test_inspection_title) {
            test_inspection = result;
          } else if (result.get('name') === test_team_name) {
            test_team = result;
          }
        });
        if (test_inspection) {
          test_inspection.set('team', test_team);
          test_observation.set('inspection', test_inspection);
        }
      }).then(() => {
        promises2.push(test_inspection.save());
        promises2.push(test_observation.save());
      }).then(() => {
        Promise.all(promises2).then(() => {
          done();
        })
      })
    });
  });

  beforeEach(() => {
    service = TestBed.get(ReportService);
  });

  afterAll((done) => {
    const promises = [];
    Parse.User.logOut().then(() => {
      promises.push(deleteInspections(test_inspection_title));
      promises.push(deleteObservations(test_observation_title));
      promises.push(deleteTeam(test_team_name));
      promises.push(deleteUser(testSuperAdminObject.user.id));
    }).then(() => {
      Promise.all(promises).then(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        done();
      });
    });
  });

  it('should get Team Reports', (done) => {
    service.getActiveTeamReports(test_team.get('id')).then((object) => {
      object.forEach((item) => {
        expect(item.get('id') === (test_inspection.id)).toBeTruthy();
      });
      done();
    });
  });

  it('should get Element of Report', (done) => {
    service.getObservation(test_observation.id).then((object) => {
      expect(object.id === test_observation.id).toBeTruthy();
      done();
    });
  });

});
