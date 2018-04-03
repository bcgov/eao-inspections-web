import { async, TestBed } from '@angular/core/testing'

import {
  createInspection, createObservation, createTeam, deleteInspections, deleteObservations, deleteTeam,
  parseInit
} from './testing.service';
import { ReportService } from './report.service';
import {Observable} from 'rxjs/Observable';
import {LoadingService} from './loading.service';

const Parse: any = require('parse');
parseInit();

describe('Report Testing', () => {
  let service: ReportService;
  let originalTimeout;
  let team1;
  let insp1, insp2;
  let obs1, obs2;
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const promises = [];
    Parse.User.logIn('superadmin@superadmin.com', 'password').then((user) => {
      console.log('Logged In as SuperAdmin');
      promises.push(createInspection('insp1', user.id).then(object => {
        insp1 = object;
      }));
      promises.push(createInspection('insp2', user.id).then( object => {
        insp2 = object;
      }));
      promises.push(createObservation('obs1').then(object => {
        obs1 = object;
      }));
      promises.push(createObservation('obs2').then(object => {
        obs2 = object;
      }));
      promises.push(createTeam('test_team1').then(object => {
        team1 = object;
      }));
    }).then(() => {
      Promise.all(promises).then(() => {
        obs1.set('inspectionId', insp1.id);
        obs1.set('teamId', team1.id);
        insp1.set('userId', Parse.User.current().id);
        obs2.set('inspectionId', insp2.id);
        obs2.set('teamId', team1.id);
        obs1.save();
        obs2.save();
        insp1.save();
      }).then(() => {
        done();
      });
    });
  });

  beforeEach(() => {
    service = TestBed.get(ReportService);
  });

  afterAll((done) => {
    console.log('Test Complete, logging User out.');
    const promises = [];

    Parse.User.logOut().then(() => {
      console.log('Start Destruction of dummy data...');
      promises.push(deleteInspections(insp1.get('title')));
      promises.push(deleteInspections(insp2.get('title')));
      promises.push(deleteObservations(obs1.get('title')));
      promises.push(deleteObservations(obs2.get('title')));
      promises.push(deleteTeam(team1.get('name')));
    }).then(() => {
      Promise.all(promises).then(() => {
        console.log('Destruction Complete');
      }).then(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        done();
      });
    });
  });

  it('should get My Reports', () => {
    Parse.User.logIn('superadmin', 'superadmin').then((user) => {
      service.getMyReports().then((object) => {
        object.forEach((item) => {
          expect(item.get('userId') === user.id).toBeTruthy();
        });
      });
    });
  });

  it('should get Team Reports', () => {
    service.getTeamReports(team1.get('id')).then((object) => {
      object.forEach((item) => {
        expect(item.get('id') === (insp1.id || insp2.id)).toBeTruthy();
      });
    });
  });

  it('should get Element of Report', () => {
    service.getObservation(insp1.id).then((object) => {
      object.forEach((item) => {
        expect(item.id === (obs1.id || obs2.id)).toBeTruthy();
      });
    });
  });

});
