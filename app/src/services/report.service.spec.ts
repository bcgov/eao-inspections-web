import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import {
  createInspection, createObservation, createTeam, deleteInspections, deleteObservations, deleteTeam,
  parseInit
} from './testing.service';
import { LoginComponent } from '../app/login/login.component';
import { ReportService } from './report.service';

const Parse: any = require('parse');
parseInit();

describe('Report Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: ReportService;
  let originalTimeout;
  let team1;
  let insp1, insp2;
  let obs1, obs2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule,
      ],
      providers: [AuthService, ReportService],
      declarations: [ LoginComponent ]
    })
      .compileComponents();
  }));

  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const promises = [];
    Parse.User.logIn('superadmin', 'superadmin').then((user) => {
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ReportService);
  });

  afterAll((done) => {
    console.log('Test Complete, logging User out.');
    const promises = [];

    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      console.log('Start Destruction of dummy data...');
      promises.push(deleteInspections(insp1.get('title')));
      promises.push(deleteInspections(insp2.get('title')));
      promises.push(deleteObservations(obs1.get('title')));
      promises.push(deleteObservations(obs2.get('title')));
      promises.push(deleteTeam(team1.get('name')));
    }).then(() => {
      Promise.all(promises).then(() => {
        console.log('Destruction Complete');
        done();
      });
    });
  });

  it('should create', () => {
    console.log('Start Testing');
    expect(component).toBeTruthy();
  });

  it('should get My Reports', () => {
    console.log('Testing get user in functionality');
    Parse.User.logIn('superadmin', 'superadmin').then((user) => {
      service.getMyReports().then((object) => {
        object.forEach((item) => {
          expect(item.get('userId') === user.id).toBeTruthy();
        });
      });
    });
  });

  it('should get Team Reports', () => {
    console.log('Testing get team reports functionality');
    service.getTeamReports(team1.get('id')).then((object) => {
      console.log('Matching ids for reports');
      object.forEach((item) => {
        expect(item.get('id') === (insp1.id || insp2.id)).toBeTruthy();
      });
    });
  });

  it('should get Element of Report', () => {
    console.log('Testing get team functionality');
    service.getObservation(insp1.id).then((object) => {
      console.log('Matching ids for elements');
      object.forEach((item) => {
        expect(item.id === (obs1.id || obs2.id)).toBeTruthy();
      });
    });
  });

});
