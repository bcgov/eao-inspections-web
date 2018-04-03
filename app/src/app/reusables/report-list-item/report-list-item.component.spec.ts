import { LoadingService } from './../../../services/loading.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(async(() => {
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
      open(): Observable<any> {
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
        { provide: LoadingService, useValue: loadingServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListItemComponent);
    component = fixture.componentInstance;
    reportInfo = { 
      title: 'mockTitle', 
      image: 'mock-image.png', 
      project: 'mockProjectName', 
      team: 'mockTeam', 
      updatedAt: date, 
      viewOnly: false 
    };
    mockUser = {
      access: {
        isSuperAdmin: false,
        isAdmin: false,
        isViewOnly: false,
      }
    };
    component.user = mockUser;
    component.data = reportInfo;
    component.fields = ['title', 'project', 'submitted', 'team', 'actions'];
    component.actions = ['download'];
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display appropriate report data', () => {
    expect(component.data.title).toBe('mockTitle');
    expect(component.data.team).toBe('mockTeam');
    expect(component.data.image).toBe('mock-image.png');
    expect(component.data.project).toBe('mockProjectName');
    expect(component.data.updatedAt).toBe(date);
  });
});
