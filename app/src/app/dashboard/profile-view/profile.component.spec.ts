import { LoadingService } from './../../../services/loading.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../../services/profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileServiceStub: any;
  let profileData: any;
  let loadingServiceStub: any;

  beforeEach(async(() => {
    profileServiceStub = {
      getUser: jasmine.createSpy('getUser').and.callFake(() => {
        return {
          id: '1',
          firstName: 'mockUserName',
          lastName: 'lastName',
          teams: [],
          publicEmail: 'mockUserEmail@gmail.com',
          profile_image: 'mock-user-image',
          access: {
            isAdmin: false,
            isSuperAdmin: false
          },
          permission: 'inspector'
        };
      }),
      getTeams: jasmine.createSpy('getTeams').and.callFake(() => {
        return [];
      }),
      getTeamAdminInfo: jasmine.createSpy('getTeamAdminInfo').and.callFake(() => {
        return {
          id: '2',
          firstName: 'mockAdminName',
          lastName: 'lastName',
          teams: [],
          publicEmail: 'mockAdminEmail@gmail.com',
          profile_image: 'mock-admin-user-image',
          access: {
            isAdmin: true,
            isSuperAdmin: false
          },
          permission: 'admin'
        };
      }),
    };
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    profileData = { access: { isSuperAdmin: false } }
    component.profile = profileData;

    fixture.detectChanges();
  });

  it('should create with appropriate data', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
