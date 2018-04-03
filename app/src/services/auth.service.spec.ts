import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../app/login/login.component';
import { AuthService } from './auth.service';
import {parseInit} from './testing.service';

const Parse: any = require('parse');
parseInit();

describe('Authentication and Authorization Testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule,
      ],
      providers: [AuthService, ],
      declarations: [ LoginComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(AuthService);
  });

  beforeAll(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach((done) => {
    if (Parse.User.current()) {
      Parse.User.logOut().then(() => {
        done();
      });
    } else {
      done();
    }
  });
  afterEach((done) => {
    setTimeout(function() {
      done();
    }, 500);
  });
  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    console.log('Start Testing');
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    console.log('Testing log in functionality');
    service.logIn('inspector', 'inspector').then(() => {
      console.log('logged in');
      expect(service.isAuthenticated()).toBeTruthy();
    });
  });

  it('should logout', () => {
    console.log('Testing log out functionality');
    service.logIn('inspector', 'inspector').then(() => {
      console.log('logged in');
      service.logOut().then(() => {
        console.log('logged out');
        expect(service.isAuthenticated()).toBeFalsy();
      });
    });
  });

  it('should be inspector', () => {
    console.log('Testing authorization level of inspector role');
    service.logIn('inspector', 'inspector').then(() => {
      expect(service.isSuperAdmin()).toBeFalsy();
      expect(service.isAdmin()).toBeFalsy();
    });
  });

  it('should be admin', () => {
    console.log('Testing authorization level of admin role');
    service.logIn('admin', 'admin').then(() => {
      expect(service.isSuperAdmin()).toBeFalsy();
      expect(service.isAdmin()).toBeTruthy();
    });
  });

  it('should be superadmin', () => {
    console.log('Testing authorization level of admin role');
    service.logIn('superadmin', 'superadmin').then(() => {
      expect(service.isSuperAdmin()).toBeTruthy();
      expect(service.isAdmin()).toBeFalsy();
    });
  });

});
