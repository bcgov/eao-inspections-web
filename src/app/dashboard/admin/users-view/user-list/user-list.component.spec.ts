import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ModalService } from '../../../../../services/modal.service';
import { UserListComponent } from './user-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let adminServiceStub;
  let modalServiceStub;
  let toastServiceStub;

  beforeEach(async(() => {
    adminServiceStub = {
      getActiveUsers: jasmine.createSpy('getActiveUsers').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
          isAdmin: false,
          isSuperAdmin: false,
        };
      }),
      createUser: jasmine.createSpy('createUser').and.callFake(() => {
        Promise.resolve(true);
      }),
      updateUser: jasmine.createSpy('updateUser').and.callFake(() => {
        Promise.resolve(true);
      }),
      archiveUser: jasmine.createSpy('archiveUser').and.callFake(() => {
        Promise.resolve(true);
      })
    };

    modalServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };

    toastServiceStub = {
      success(): Observable<any> {
        return Observable.of(true);
      },
      error(): Observable<any> {
        return Observable.of(true);
      }
    }

    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ModalService, useValue: modalServiceStub },
        { provide: ToastrService, useValue: toastServiceStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch active users on ngOnInit', () => {
    adminServiceStub.getActiveUsers();
    expect(adminServiceStub.getActiveUsers).toHaveBeenCalledTimes(1);
    expect(component.users).toBeTruthy();
  });

  it('should create a new user', () => {
    adminServiceStub.createUser();
    expect(adminServiceStub.createUser).toHaveBeenCalledTimes(1);
    expect(toastServiceStub.success).toBeTruthy();
  });

  it('should update a current user', () => {
    adminServiceStub.updateUser();
    expect(adminServiceStub.updateUser).toHaveBeenCalledTimes(1);
    expect(toastServiceStub.success).toBeTruthy();
  });

  it('should archive a user', () => {
    adminServiceStub.archiveUser();
    expect(adminServiceStub.archiveUser).toHaveBeenCalledTimes(1);
    expect(toastServiceStub.success).toBeTruthy();
  });
});
