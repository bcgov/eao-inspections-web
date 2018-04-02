import { OrderByPipe } from './../../../../directives/orderby.pipe';
import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchivedInspectionsComponent } from './archived-inspections.component';
<<<<<<< HEAD
import { LoadingService } from '../../../../../services/loading.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
=======
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '../../../../../services/loading.service';
>>>>>>> 9c669eff444849e306c9d74a0d8216bad2aa070d

describe('ArchivedInspectionsComponent', () => {
  let component: ArchivedInspectionsComponent;
  let fixture: ComponentFixture<ArchivedInspectionsComponent>;
  let adminServiceStub: any;
  let toastServiceStub: any;
  let mockPipe: OrderByPipe;
<<<<<<< HEAD
=======
  let toastServiceStub: any;
>>>>>>> 9c669eff444849e306c9d74a0d8216bad2aa070d
  let loadingServiceStub: any;

  beforeEach(async(() => {
    mockPipe = new OrderByPipe();
    adminServiceStub = {
      getArchivedReports: jasmine.createSpy('getArchivedReports').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
        };
      })
    };
<<<<<<< HEAD

=======
>>>>>>> 9c669eff444849e306c9d74a0d8216bad2aa070d
    toastServiceStub = {
      success(): Observable<any> {
        return Observable.of(true);
      },
      error(): Observable<any> {
        return Observable.of(true);
      }
    };
<<<<<<< HEAD

=======
>>>>>>> 9c669eff444849e306c9d74a0d8216bad2aa070d
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
    };
<<<<<<< HEAD

=======
>>>>>>> 9c669eff444849e306c9d74a0d8216bad2aa070d
    TestBed.configureTestingModule({
      declarations: [ ArchivedInspectionsComponent, OrderByPipe ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
<<<<<<< HEAD
        { provide: AdminService, useValue: adminServiceStub }, 
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
        Location
      ],
=======
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
        // Location,
        ],
>>>>>>> 9c669eff444849e306c9d74a0d8216bad2aa070d
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInspectionsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch archived inspections on ngOnInit', () => {
    adminServiceStub.getArchivedReports();
    expect(adminServiceStub.getArchivedReports).toHaveBeenCalledTimes(1);
    expect(component.data).toBeTruthy();
  });
});
