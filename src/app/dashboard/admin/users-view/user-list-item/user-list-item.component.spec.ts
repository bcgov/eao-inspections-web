import { ModalService } from './../../../../../services/modal.service';
import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserListItemComponent } from './user-list-item.component';
import { ToastrService } from 'ngx-toastr';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;
  let modalServiceStub;
  let adminServiceStub;
  let toastServiceStub;
  let mockData: any;

  beforeEach(async(() => {
    adminServiceStub = {};

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
      declarations: [ UserListItemComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ModalService, useValue: modalServiceStub },
        { provide: ToastrService, useValue: toastServiceStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;

    mockData = { firstName: "John", lastName: "Smith", team: "Mock Team", publicEmail: "mock@gmail.com", permission: "admin", image: "mock.png", teamImage: "mock-team.png"}
    component.user = mockData;
    fixture.detectChanges();
  });

  it('should create with correct data', () => {
    expect(component).toBeTruthy();
    expect(component.user.firstName).toBe("John");
    expect(component.user.lastName).toBe("Smith");
    expect(component.user.team).toBe("Mock Team");
    expect(component.user.publicEmail).toBe("mock@gmail.com");
    expect(component.user.permission).toBe("admin");
    expect(component.user.image).toBe("mock.png");
    expect(component.user.teamImage).toBe("mock-team.png");
  });
});
