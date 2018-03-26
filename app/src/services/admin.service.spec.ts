import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../app/login/login.component';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { AdminService } from './admin.service';
import {createInspection, deleteInspections, deleteTeam, deleteUser, randomKey} from './testing.service';

const Parse = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;
Parse.masterKey = environment.parseMasterKey;

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
    }, 500);
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
      promises.push(deleteUser(test_user.id));
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

  it('should get archived Users', () => {
    console.log('Testing get archived users in functionality');
    service.getArchivedUsers().then(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should get active Users', () => {
    console.log('Testing get active users in functionality');
    service.getActiveUsers().then(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should create user', () => {
    console.log('Testing create user in functionality');
    const randKey = randomKey();
    service.createUser(randKey, randKey, 'mockEmail@gmail.com' + randKey, randKey, randKey, randKey).then(value => {
      test_user = value;
      const query = new Parse.Query(Parse.User);
      query.get(value.id).then((result) => {
        console.log('Matching user ids...');
        expect(result.id === test_user.id).toBeTruthy();
      });
    });
  });

  it('should update user', () => {
    const query = new Parse.Query('_User');
    query.get(test_user.id).then((result) => {
      console.log(result);
     test_user.id = result.id;
     console.log('Testing update user in functionality: ' + test_user.id);
     const name_change = 'test_user_changed';
     Parse.User.logIn('superadmin', 'superadmin').then(() => {
       service.updateUser(test_user.id,
         'firstNameChanged',
         'lastNameChanged',
         'email@gmail.com',
         'admin',
         null).then((object) => {
         console.log('Matching changed names...');
         test_user = object;
         expect(test_user.get('firstName') === 'firstNameChanged').toBeTruthy();
       });
     });
    });
  });

  it('should archive user', () => {
    const query = new Parse.Query('_User');
    query.get(test_user.id).then((result) => {
      test_user.id = result.id;
      console.log('Testing archive user in functionality');
      service.archiveUser(test_user.id).then((object) => {
        console.log('Checking status of user...');
        test_user = object;
        expect(test_user.get('isActive')).toBeFalsy();
      });
    });
  });

  it('should unArchive user', () => {
    const query = new Parse.Query('_User');
    query.get(test_user.id).then((result) => {
      test_user.id = result.id;
      console.log('Testing unArchive user in functionality');
      service.unArchiveUser(test_user.id).then((object) => {
        console.log('Checking status of user...');
        test_user = object;
        expect(test_user.get('isActive')).toBeTruthy();
      });
    });
  });

  it('should create team', () => {
    console.log('Testing create team in functionality');
    service.createTeam('test_team', 'team_color', test_user).then((object) => {
      test_team = object;
      const query = new Parse.Query('Team');
      query.get(test_team.id).then((result) => {
        console.log('Matching ids...');
        expect(result.id === test_team.id).toBeTruthy();
      });
    });
  });

  it('should update team', () => {
    const query = new Parse.Query('Team');
    query.get(test_team.id).then((result) => {
      test_team.id = result.id;
      console.log('Testing updating team in functionality: ' + test_team.id);
      service.updateTeam(test_team.id, 'mockName', '#00000', test.user).then((object) => {
        test_team = object;
        expect(test_team.get('name') === 'mockName').toBeTruthy();
      });
    });
  });

  it('should archive team', () => {
    console.log('Testing archive team in functionality');
    const query = new Parse.Query('Team');
    query.get(test_team.id).then((result) => {
      test_team = result;
      service.archiveTeam(test_team.id).then(() => {
        console.log('Checking status...');
        expect(test_team.get('isActive')).toBeFalsy();
      });
    });
  });

  it('should unArchive team', () => {
    console.log('Testing unArchive team in functionality');
    const query = new Parse.Query('Team');
    query.get(test_team.id).then((result) => {
      test_team = result;
      service.unArchiveTeam(test_team.id).then(() => {
        console.log('Checking status...');
        expect(test_team.get('isActive')).toBeTruthy();
      });
    });
  });

  it('should get archived Teams', () => {
    console.log('Testing get archived teams in functionality');
    service.getArchivedTeams().then(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should get active Teams', () => {
    console.log('Testing get active teams in functionality');
    service.getActiveTeams().then(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should get Reports', () => {
    console.log('Testing get reports in functionality');
    service.getReports().then((object) => {
      console.log('Checking retrieved report...');
      expect(object[0].get('adminId') === Parse.User.current().id).toBeTruthy();
    });
  });

  it('should get archived reports', () => {
    console.log('Testing get archive reports in functionality');
    service.getArchivedReport().then(value => {
      expect(value).toBeTruthy();
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
