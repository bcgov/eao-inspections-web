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

fdescribe('Admin Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AdminService;
  let originalTimeout;

  let test_user;
  let test_team;

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
    Parse.User.logIn('superadmin', 'superadmin').then(() => {
      console.log('Logged In as SuperAdmin');
      done();
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(AdminService);
  });

  afterEach((done) => {
    setTimeout(function() {
      // do some stuff
      done();
    }, 1000);
  });

  afterAll((done) => {
    console.log('Test Complete, logging User out.');
    // test_team.destroy().then(() => {
    //   Parse.User.logOut().then(() => {
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    //     done();
    //   });
    // });
    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      done();
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
      test_user = value;
      expect(value).toBeTruthy();
    });
  });

  it('should update user', () => {
    console.log('Testing update user in functionality');
    const name_change = 'test_user_changed';
    service.updateUser(test_user.id, 'name', name_change).then(value => {
      console.log(value);
      expect(test_user.name === name_change).toBeTruthy();
    });
  });

  it('should archive user', () => {
    console.log('Testing archive user in functionality');
    service.deleteUser(test_user.id).then(value => {
      console.log(value);
      expect(value['status']).toBeFalsy();
    });
  });

  fit('should create team', () => {
    console.log('Testing create team in functionality');
    service.createTeam('test_team').then(value => {
      test_team = value;
      const query = new Parse.Query('Team');
      query.get(test_team.id).then(object => {
        console.log('Matching ids...');
        expect(object.id === test_team.id).toBeTruthy();
      });
    });
  });

  fit('should update team', () => {
    console.log('Testing updating team in functionality: ' + test_team.id);
    service.updateTeam(test_team.get('id'), 'name', 'new_name').then(value => {
      expect(value).toBeTruthy();
      console.log(value);
      expect(value['name'] === 'new_name').toBeTruthy();
    });
  });

  fit('should delete team', () => {
    console.log('Testing delete team in functionality');
    service.deleteTeam(test_team.id).then(() => {
      const query = new Parse.Query('Team');
      query.get(test_team.id).then(object => {
        console.log('Checking status...');
        expect(object.status).toBeFalsy();
      });
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
