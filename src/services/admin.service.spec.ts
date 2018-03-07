import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../app/login/login.component';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { AdminService } from './admin.service';
import {createInspection, deleteInspections, deleteTeam, randomKey} from './testing.service';

const Parse = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

describe('Admin Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AdminService;
  let originalTimeout;

  let test_user;
  let test_team;
  let admin_user;
  let insp1, insp2, insp3;

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
    const promises = [];
    Parse.User.logIn('superadmin', 'superadmin').then((user) => {
      console.log('Logged In as SuperAdmin');
      admin_user = user;
      promises.push(createInspection('insp1', user.id).then((object) => {
        insp1 = object;
      }));
      promises.push(createInspection('insp2', user.id).then( (object) => {
        insp2 = object;
      }));
      promises.push(createInspection('insp3', user.id).then((object) => {
        insp3 = object;
      }));
    }).then(() => {
      Promise.all(promises).then(() => {
        done();
      });
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
      done();
    }, 1500);
  });

  afterAll((done) => {
    console.log('Test Complete, logging User out.');
    const promises = [];

    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      promises.push(deleteInspections(insp1.get('title')));
      promises.push(deleteInspections(insp2.get('title')));
      promises.push(deleteInspections(insp3.get('title')));
      promises.push(deleteTeam(test_team.get('name')));
    }).then(() => {
      Promise.all(promises).then(() => {
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
      expect(value).toBeTruthy();
    });
  });

  it('should create user', () => {
    console.log('Testing create user in functionality');
    const randKey = randomKey();
    service.createUser(randKey, randKey, randKey + '@test_user.com').then(value => {
      test_user = value;
      const query = new Parse.Query('_User');
      query.get(test_user.id).then((result) => {
        console.log('Matching user ids...');
        expect(result.id === test_user.id).toBeTruthy();
      });
    });
  });

  it('should update user', () => {
    console.log('Testing update user in functionality: ' + test_user.id);
    const name_change = 'test_user_changed';
    Parse.User.logIn('superadmin', 'superadmin').then(() => {
      service.updateUser(test_user.id, 'fname', name_change).then((object) => {
        console.log('Matching changed names...');
        test_user = object;
        expect(test_user.get('fname') === name_change).toBeTruthy();
      });
    });
  });

  it('should archive user', () => {
    console.log('Testing archive user in functionality');
    service.deleteUser(test_user.id).then((object) => {
      console.log('Checking status of user...');
      test_user = object;
      expect(test_user.get('active') === 'false').toBeTruthy();
    });
  });

  it('should create team', () => {
    console.log('Testing create team in functionality');
    service.createTeam('test_team').then((object) => {
      test_team = object;
      const query = new Parse.Query('Team');
      query.get(test_team.id).then((result) => {
        console.log('Matching ids...');
        expect(result.id === test_team.id).toBeTruthy();
      });
    });
  });

  it('should update team', () => {
    console.log('Testing updating team in functionality: ' + test_team.id);
    service.updateTeam(test_team.id, 'name', 'new_name').then((object) => {
      test_team = object;
      expect(object).toBeTruthy();
      expect(test_team.get('name') === 'new_name').toBeTruthy();
    });
  });

  it('should delete team', () => {
    console.log('Testing delete team in functionality');
    service.deleteTeam(test_team.id).then(() => {
      const query = new Parse.Query('Team');
      query.get(test_team.id).then((result) => {
        test_team = result;
        console.log('Checking status...');
        expect(test_team.get('active')).toBeFalsy();
      });
    });
  });

  it('should get Reports', () => {
    console.log('Testing get reports in functionality');
    service.getReports().then((object) => {
      console.log('Checking retrieved report...');
      expect(object[0].get('adminId') === Parse.User.current().id).toBeTruthy();
    });
  });

  it('should archive Reports', () => {
    console.log('Testing archive Reports in functionality: ' + insp1.id);
    service.archiveReport(insp1.id).then((object) => {
      insp1 = object;
      expect(insp1.get('active')).toBeFalsy();
    });
  });

});
