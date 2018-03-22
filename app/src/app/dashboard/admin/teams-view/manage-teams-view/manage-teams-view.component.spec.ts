import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ManageTeamsViewComponent } from './manage-teams-view.component';
import {Observable} from 'rxjs/Observable';
import {AdminService} from '../../../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {ModalService} from '../../../../../services/modal.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('ManageTeamsViewComponent', () => {
  let component: ManageTeamsViewComponent;
  let fixture: ComponentFixture<ManageTeamsViewComponent>;
  let modalServiceStub: any;
  let adminServiceStub: any;
  let toastServiceStub: any;

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

    TestBed.configureTestingModule({
      declarations: [ ManageTeamsViewComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ToastrService, useValue: toastServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
