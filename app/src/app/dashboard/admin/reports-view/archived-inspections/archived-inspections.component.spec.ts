import { OrderByPipe } from '../../../../directives/orderby.pipe';
import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed, resetFakeAsyncZone, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchivedInspectionsComponent } from './archived-inspections.component';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '../../../../../services/loading.service';
import { Inspection } from '../../../../../models/inspection.model';

describe('ArchivedInspectionsComponent', () => {
  let component: ArchivedInspectionsComponent;
  let fixture: ComponentFixture<ArchivedInspectionsComponent>;
  let adminServiceStub: any;
  let toastServiceStub: any;
  let loadingServiceStub: any;
  let mockData: any;
  let compiled;

  beforeEach(async(() => {
    adminServiceStub = {
      getArchivedReports: jasmine.createSpy('getArchivedReports').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
        };
      })
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
      declarations: [ ArchivedInspectionsComponent, OrderByPipe ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
        ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInspectionsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    mockData = [
      new Inspection('1', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('2', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('3', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
    ];
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render table for no reports', () => {
    mockData = [];
    component.data = mockData;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(0)
    expect(compiled.querySelectorAll('no-content')).toBeTruthy();
  });

  it('should fetch archived inspections on ngOnInit', () => {
    adminServiceStub.getArchivedReports();
    expect(adminServiceStub.getArchivedReports).toHaveBeenCalledTimes(1);
    expect(component.data).toBeTruthy();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(3)
  });

  it('should fetch more data on page change', fakeAsync(() => {
    spyOn(component, 'onChangePage').and.returnValue(Promise.resolve(true));
    component.onChangePage(2);
    adminServiceStub.getArchivedReports();
    expect(component.onChangePage).toHaveBeenCalledWith(2);
    expect(adminServiceStub.getArchivedReports).toHaveBeenCalled();
    mockData = [
      new Inspection('4', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('5', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('6', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('7', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('8', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
      new Inspection('9', 'test', 'test', 'test', null, 'test', null, null, null, 'test', false, null),
    ];
    component.data = mockData;
    tick();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(6)
  }));
});
