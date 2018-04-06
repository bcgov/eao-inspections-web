import { async, TestBed } from '@angular/core/testing';

import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';

import {AdminService} from './admin.service';
import {LoadingService} from './loading.service';
import {createInspection, createUser, deleteInspections, deleteTeam, deleteUser, parseInit, randomKey} from './testing.service';
import {parseUserToModel} from './parse.service';

const Parse: any = require('parse');
parseInit();

describe('Admin Testing', () => {
  let service: AdminService;
  let originalTimeout;
  let toastServiceStub: any;
  let loadingServiceStub: any;

  let testSuperAdminObject;
  let test_user;
  let test_team;
  let admin_user;
  let test_inspection;

  beforeEach(async(() => {
    toastServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };
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
        { provide: ToastrService, useValue: toastServiceStub },
        AdminService],
    })
      .compileComponents();
  }));

  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    const promises = [];
    createUser('superadmin').then((user) => {
      testSuperAdminObject = user;
      admin_user = testSuperAdminObject.user;
      promises.push(createInspection('test_inspection'));
    }).then(() => {
      Promise.all(promises).then((results) => {
        results.forEach(result => {
          if(result.get('title') === 'test_inspection') {
            test_inspection = result;
          }
        });
        done();
      });
    });
  });

  beforeEach(() => {
    service = TestBed.get(AdminService);
  });

  afterAll((done) => {
    const promises = [];

    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      promises.push(deleteInspections(test_inspection.get('title')));
      promises.push(deleteUser(test_user.id));
      promises.push(deleteTeam(test_team.get('name')));
      promises.push(deleteUser(admin_user.id));
    }).then(() => {
      Promise.all(promises).then(() => {
        done();
      });
    });
  });

  it('should get archived Users', (done) => {
    service.getArchivedUsers().then(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should get active Users', (done) => {
    service.getActiveUsers().then(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should create user', (done) => {
    const randKey = randomKey();
    service.createUser(randKey, randKey, 'mockEmail@gmail.com' + randKey, randKey, 'admin', null).then(value => {
      test_user = value;
      const query = new Parse.Query(Parse.User);
      query.get(value.id).then((result) => {
        expect(result.id === value.id).toBeTruthy();
        done();
      });
    });
  });

  it('should update user', (done) => {
     Parse.User.logIn(testSuperAdminObject.username, testSuperAdminObject.key).then(() => {
       const randKey = randomKey();
       service.updateUser(test_user.id,
         'firstNameChanged',
         'lastNameChanged',
         'email@gmail.com' + randKey,
         'inspector',
         null).then((object) => {
         test_user = object;
         expect(test_user.get('firstName') === 'firstNameChanged').toBeTruthy();
         done();
       });
     });
  });

  it('should archive user', (done) => {
    service.archiveUser(parseUserToModel(test_user)).then((object) => {
      test_user = object;
      expect(test_user.get('isActive')).toBeFalsy();
      done();
    });
  });

  it('should unArchive user', (done) => {
    service.unArchiveUser(parseUserToModel(test_user)).then((object) => {
      test_user = object;
      expect(test_user.get('isActive')).toBeTruthy();
      done();
    });
  });

  it('should create team', (done) => {
    service.createTeam('test_team', 'team_color', test_user.id, null).then((object) => {
      test_team = object;
      const query = new Parse.Query('Team');
      query.get(test_team.id).then((result) => {
        expect(result.id === test_team.id).toBeTruthy();
        done();
      });
    });
  });

  it('should update team', (done) => {
   service.updateTeam(test_team.id, 'mockName', '#00000', test_user.id, null).then((object) => {
      test_team = object;
      expect(test_team.get('name') === 'mockName').toBeTruthy();
      done();
    });
  });

  it('should archive team', (done) => {
    service.archiveTeam(test_team).then(() => {
      expect(test_team.get('isActive')).toBeFalsy();
      done();
    });
  });

  it('should unArchive team', (done) => {
    service.unArchiveTeam(test_team).then(() => {
      expect(test_team.get('isActive')).toBeTruthy();
      done();
    });
  });

  it('should get archived Teams', (done) => {
    service.getArchivedTeams().then(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should get active Teams', (done) => {
    service.getActiveTeams().then(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should get Reports', (done) => {
    service.getReports().then((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should get archived reports', (done) => {
    service.getArchivedReport().then(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should archive Reports', (done) => {
    service.archiveReport(test_inspection).then((object) => {
      expect(object.get('isActive')).toBeFalsy();
      done();
    });
  });

});
