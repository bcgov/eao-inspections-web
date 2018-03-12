import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchivedUsersComponent } from './archived-users.component';

describe('ArchivedUsersComponent', () => {
  let component: ArchivedUsersComponent;
  let fixture: ComponentFixture<ArchivedUsersComponent>;
  let adminServiceStub: any;
  
  beforeEach(async(() => {
    adminServiceStub = {
      getArchivedUsers: jasmine.createSpy('getArchivedUsers').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
          isAdmin: false,
          isSuperAdmin: false,
        };
      })
    };

    TestBed.configureTestingModule({
      declarations: [ ArchivedUsersComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{ provide: AdminService, useValue: adminServiceStub }, ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should fetch archived users on ngOnInit', () => {
    expect(adminServiceStub.getArchivedUsers).toHaveBeenCalledTimes(1);
  });
});
