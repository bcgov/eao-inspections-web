import { async, TestBed } from '@angular/core/testing';

import { createTeam, deleteTeam } from './testing.service';
import { TeamService } from './team.service';

const Parse: any = require('parse');

describe('Team Service Testing', () => {
  let service: TeamService;
  let originalTimeout;
  let team1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TeamService],
    })
      .compileComponents();
  }));


  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const promises = [];
    Parse.User.logIn('superadmin@superadmin.com', 'password').then((user) => {
      console.log('Logged In as SuperAdmin');
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
    console.log('Test Complete, logging User out.');
    const promises = [];

    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      console.log('Start Destruction of dummy data...');
      promises.push(deleteTeam(team1.get('name')));
    }).then(() => {
      Promise.all(promises).then(() => {
        console.log('Destruction Complete');
        done();
      });
    });
  });

  it('should get team', () => {
    console.log('Testing get team in functionality');
    service.getTeam(team1.id).then((object) => {
      expect(object.id === Parse.User.current().id).toBeTruthy();
    });
  });

});
