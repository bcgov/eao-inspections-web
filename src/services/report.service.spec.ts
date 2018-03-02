import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../app/login/login.component';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { ReportService } from './report.service';
const Parse = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

describe('Report Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: ReportService;
  let originalTimeout;
  const test_team = new Parse.Object('Team');

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
    Parse.User.logIn('admin', 'admin').then(() => {
      test_team.set('name', 'test_team');
      test_team.save().then(() => {
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

  afterEach(() => { });

  afterAll((done) => {
    console.log('destroying test');
    test_team.destroy().then(() => {
      Parse.User.logOut().then(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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
    service.getMyReports().then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should get Team Reports', () => {
    console.log('Testing get team functionality');
    service.getTeamReports(test_team.get('id')).then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should get Element of Report', () => {
    console.log('Testing get team functionality');
    service.getTeamReports(test_team.get('id')).then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

});
