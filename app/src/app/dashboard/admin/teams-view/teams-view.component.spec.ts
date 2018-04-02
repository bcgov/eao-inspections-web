import { LoadingService } from './../../../../services/loading.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TeamsViewComponent } from './teams-view.component';
import {AdminService} from '../../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import {ModalService} from '../../../../services/modal.service';

describe('TeamsViewComponent', () => {
  let component: TeamsViewComponent;
  let fixture: ComponentFixture<TeamsViewComponent>;
  let modalServiceStub: any;
  let toastServiceStub: any;
  let adminServiceStub: any;
  let loadingServiceStub: any;

  beforeEach(async(() => {
    adminServiceStub = {
      updateTeam: jasmine.createSpy('updateTeam').and.callFake(() => {
        Promise.resolve(true);
      }),
      archiveTeams: jasmine.createSpy('archiveTeams').and.callFake(() => {
        Promise.resolve(true);
      }),
      unArchiveTeams: jasmine.createSpy('unArchiveTeams').and.callFake(() => {
        Promise.resolve(true);
      }),
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
      declarations: [ TeamsViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
