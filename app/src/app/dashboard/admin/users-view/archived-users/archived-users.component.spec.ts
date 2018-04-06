import { LoadingService } from './../../../../../services/loading.service';
import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { ArchivedUsersComponent } from './archived-users.component';

describe('ArchivedUsersComponent', () => {
  let component: ArchivedUsersComponent;
  let fixture: ComponentFixture<ArchivedUsersComponent>;
  let adminServiceStub: any;
  let toastServiceStub;
  let modalServiceStub;
  let loadingServiceStub;
  let mockUsers: any;

  beforeEach(async(() => {
    adminServiceStub = {
      getArchivedUsers: jasmine.createSpy('getArchivedUsers').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
          access: {
            isAdmin: false,
            isSuperAdmin: false
          },
        };
      }),
      unArchiveUser: jasmine.createSpy('unArchiveUser').and.callFake(() => {
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
      declarations: [ ArchivedUsersComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ModalService, useValue: modalServiceStub },
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedUsersComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch archived users on ngOnInit', () => {
    adminServiceStub.getArchivedUsers();
    expect(adminServiceStub.getArchivedUsers).toHaveBeenCalledTimes(1);
    mockUsers = {}
    component.users = mockUsers;
    expect(component.users).toBeTruthy();
  });

  it('should unArchive a user', () => {
    adminServiceStub.unArchiveUser();
    expect(adminServiceStub.unArchiveUser).toHaveBeenCalledTimes(1);
    expect(toastServiceStub.success).toBeTruthy();
  });
});
