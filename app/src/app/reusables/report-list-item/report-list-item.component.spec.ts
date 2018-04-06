import { ReportService } from './../../../services/report.service';
import { AdminService } from './../../../services/admin.service';
import { By } from '@angular/platform-browser';
import { Inspection } from './../../../models/inspection.model';
import { LoadingService } from './../../../services/loading.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { ReportListItemComponent } from './report-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from '../../../services/modal.service';

describe('ReportListItemComponent', () => {
  let component: ReportListItemComponent;
  let fixture: ComponentFixture<ReportListItemComponent>;
  let reportInfo: any;
  let mockUser;
  const date = Date();
  let modalServiceStub;
  let toastServiceStub;
  let loadingServiceStub;
  let adminServiceStub;
  let reportServiceStub;

  beforeEach(async(() => {
    adminServiceStub = {
      updateReportPermission: jasmine.createSpy('updateReportPermission').and.callFake(() => {
        Promise.resolve(true);
      }),
      archiveReport: jasmine.createSpy('archiveReport').and.callFake(() => {
        Promise.resolve(true);
      }),
      unArchiveReport: jasmine.createSpy('unArchiveReport').and.callFake(() => {
        Promise.resolve(true);
      }),
    };
    reportServiceStub = {
      download: jasmine.createSpy('download').and.callFake(() => {
        Promise.resolve(true);
      }),
    }
    modalServiceStub = {
      open(): Observable<any> {
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
    toastServiceStub = {
      success(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ReportListItemComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ReportService, useValue: reportServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListItemComponent);
    component = fixture.componentInstance;
    reportInfo = [
      new Inspection('1', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, false),
      new Inspection('2', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, false),
      new Inspection('3', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, true),
    ];
    mockUser = {
      access: {
        isSuperAdmin: false,
        isAdmin: false,
        isViewOnly: false,
      }
    };
    component.user = mockUser;
    component.data = reportInfo;
    component.fields = ['title', 'project', 'submitted', 'team', 'actions', 'view'];
    component.actions = ['download'];
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display appropriate report data', () => {
    expect((component.data).length).toBe(3);
  });

  it('should open appropiate modal when archive/unArchive buttons are clicked', () => {
    spyOn(component, 'open');
    component.open('archive');
    expect(modalServiceStub.open).toBeTruthy();
  });

  it('should change inspection permission', fakeAsync(() => {
    spyOn(component, 'onSetPermission')
    let toggleEl = fixture.debugElement.nativeElement.querySelector('input');
    toggleEl.click(component.data[0]);
    tick();
    fixture.detectChanges();
    expect(component.onSetPermission).toHaveBeenCalledTimes(1);
    adminServiceStub.updateReportPermission(component.data[0].id, component.data[0].viewOnly);
    expect(adminServiceStub.updateReportPermission).toHaveBeenCalledWith("1", false)
    expect(toastServiceStub.success).toBeTruthy();
  }));

  it('should archive inspection', () => {
    spyOn(component, 'onArchive');
    spyOn(component.refresh, 'emit');
    component.onArchive(component.data[1].id);
    expect(component.onArchive).toHaveBeenCalledWith('2');
    adminServiceStub.archiveReport(component.data[1].id);
    expect(adminServiceStub.archiveReport).toHaveBeenCalledWith('2');
    expect(toastServiceStub.success).toBeTruthy();
    component.refresh.emit();
    expect(component.refresh.emit).toHaveBeenCalled();
  });

  it('should unArchive inspection', () => {
    component.data[1].isActive = false;
    expect(component).toBeTruthy();
    spyOn(component, 'onUnArchive');
    spyOn(component.refresh, 'emit');
    component.onUnArchive(component.data[1].id);
    expect(component.onUnArchive).toHaveBeenCalledWith('2');
    adminServiceStub.unArchiveReport(component.data[1].id);
    expect(adminServiceStub.unArchiveReport).toHaveBeenCalledWith('2');
    expect(toastServiceStub.success).toBeTruthy();
    component.refresh.emit();
    expect(component.refresh.emit).toHaveBeenCalled();
  });

  it('should download inspection', () => {
    spyOn(component, 'onDownload');
    let buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard--actions');
    buttonEl.click(component.data[1]);
    expect(component.onDownload).toHaveBeenCalledTimes(1);
    reportServiceStub.download(component.data[1]);
    expect(reportServiceStub.download).toHaveBeenCalledWith(component.data[1]);
    expect(toastServiceStub.success).toBeTruthy();
  });
});
