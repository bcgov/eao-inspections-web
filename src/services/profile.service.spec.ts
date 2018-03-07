import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../app/login/login.component';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import {ProfileService} from './profile.service';
import {createInspection, createObservation, createTeam} from './testing.service';
const Parse = require('parse');

Parse.initialize(environment.parseId, environment.parseKey);
Parse.serverURL = environment.parseURL;

describe('Authentication and Authorization Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: ProfileService;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule,
      ],
      providers: [AuthService, ProfileService],
      declarations: [ LoginComponent ]
    })
      .compileComponents();
  }));

  beforeAll((done) => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    Parse.User.logIn('superadmin', 'superadmin').then((user) => {
      done();
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ProfileService);
  });

  afterAll((done) => {
    Parse.User.logOut().then(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      done();
    });

  });

  it('should create', () => {
    console.log('Start Testing');
    expect(component).toBeTruthy();
  });

  it('should get user', () => {
    console.log('Testing get user in functionality');
    service.getUser().then((object) => {
      expect(object.id === Parse.User.current().id).toBeTruthy();
    });
  });

  it('should get team', () => {
    console.log('Testing get team functionality');
    service.getTeams().then((object) => {
      expect(object).toBeTruthy();
    });
  });

  it('should get teamAdmin', () => {
    console.log('Testing get team functionality');
    service.getTeamAdminInfo().then((object) => {
      expect(object).toBeTruthy();
    });
  });

});
