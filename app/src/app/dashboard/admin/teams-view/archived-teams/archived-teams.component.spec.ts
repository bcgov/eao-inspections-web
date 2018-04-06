import { LoadingService } from './../../../../../services/loading.service';
import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchivedTeamsComponent } from './archived-teams.component';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

fdescribe('ArchivedTeamsComponent', () => {
  let component: ArchivedTeamsComponent;
  let fixture: ComponentFixture<ArchivedTeamsComponent>;
  let adminServiceStub: any;
  let toastServiceStub: any;
  let loadingServiceStub: any;
  let mockTeams;
  let compiled;

  beforeEach(async(() => {
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
    adminServiceStub = {
      getArchivedTeams: jasmine.createSpy('getArchivedTeams').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
          name: "mockName",
          color: "#000000"
        };
      })
    };

    TestBed.configureTestingModule({
      declarations: [ ArchivedTeamsComponent ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
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
    fixture = TestBed.createComponent(ArchivedTeamsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    mockTeams = [{id: 1}];
    component.teams = mockTeams;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch archived teams on ngOnInit', () => {
    adminServiceStub.getArchivedTeams();
    expect(adminServiceStub.getArchivedTeams).toHaveBeenCalledTimes(1);
    expect(component.teams).toBeTruthy();
  });
});
