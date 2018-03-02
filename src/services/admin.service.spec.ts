import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../app/login/login.component';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import {AdminService} from './admin.service';
const Parse = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

describe('Authentication and Authorization Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AdminService;
  let originalTimeout;

  const test_team = new Parse.Object('Team');
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule,
      ],
      providers: [AuthService, AdminService],
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(AdminService);
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

  it('should get Users', () => {
    console.log('Testing get user in functionality');
    service.getUsers().then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should create user', () => {
    console.log('Testing create user in functionality');
    service.createUser('test_user', 'test_user', 'test_user@test_user.com').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should update user', () => {
    console.log('Testing update user in functionality');
    service.updateUser('', 'name', 'test_user_changed').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should archive user', () => {
    console.log('Testing archive user in functionality');
    service.deleteUser('').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should create team', () => {
    console.log('Testing create team in functionality');
    service.createTeam('test_team').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should update team', () => {
    console.log('Testing create team in functionality');
    service.updateTeam('', 'name', 'test_team').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should update team', () => {
    console.log('Testing delete team in functionality');
    service.deleteTeam('').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should get Reports', () => {
    console.log('Testing get reports in functionality');
    service.getReports().then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

  it('should archive Reports', () => {
    console.log('Testing archive Reports in functionality');
    service.archiveReport('').then(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  });

});
