import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../../services/profile.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileServiceStub: any;

  beforeEach(async(() => {
    profileServiceStub = {
      getUser: jasmine.createSpy('getUser').and.callFake(() => {
        return {
          objectId: '1',
          name: 'mockUserName',
          teams: [],
          email: "mockUserEmail@gmail.com",
          image: "mock-user-image",
          isAdmin: false
        };
      }),
      getTeams: jasmine.createSpy('getTeams').and.callFake(() => {
        return {
          teams: []
        };
      }),
      getTeamAdminInfo: jasmine.createSpy('getTeamAdminInfo').and.callFake(() => {
        return {
          objectId: '2',
          name: "mockAdminName",
          team: "",
          email: "mockAdminEmail@gmail.com",
          image: "mock-admin-image.png",
          isAdmin: true
        };
      }),
    };

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with appropiate data', () => {
    expect(component).toBeTruthy();
  });
});
