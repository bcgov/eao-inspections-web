import { LoadingService } from './../../../../services/loading.service';
import { BasicUser } from './../../../../models/user.model';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ReportsViewComponent } from './reports-view.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Team} from '../../../../models/team.model';
import {AdminService} from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';


describe('ReportsViewComponent', () => {
  let component: ReportsViewComponent;
  let fixture: ComponentFixture<ReportsViewComponent>;
  let compiled;
  let loadingServiceStub;
  let toastServiceStub;

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

    TestBed.configureTestingModule({
      declarations: [ ReportsViewComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: ToastrService, useValue: toastServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsViewComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct title', () => {
    expect(compiled.querySelector('.dashboard__title').textContent).toContain('Inspections');
  });

  it('should render correct number of team cards', fakeAsync(() => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const teams = [
      new Team('team-1-id', 'team1', null, 'blue', true),
      new Team('team-2-id', 'team2', null, 'red', true),
    ];
    spyOn(adminService, 'getActiveTeams').and.returnValue(Promise.resolve(teams));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const links = compiled.querySelectorAll('a');
    teams.forEach((team, index) => {
      let link = links[index + 1].href;
      link = link.split('/').pop();
      expect(team.id).toBe(link);
    });
    expect(compiled.querySelectorAll('team-card').length).toBe(2);
  }));

  it('should fetch more data on page change', fakeAsync(() => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const teams = [
      new Team('team-1-id', 'team1', null, 'blue', true),
      new Team('team-2-id', 'team2', null, 'red', true),
      new Team('team-2-id', 'team2', null, 'red', true),
      new Team('team-2-id', 'team2', null, 'red', true),
    ];
    spyOn(component, 'onChangePage').and.returnValue(Promise.resolve(true));
    spyOn(adminService, 'getActiveTeams').and.returnValue(Promise.resolve(teams));
    component.onChangePage(2);
    adminService.getActiveTeams();
    expect(component.onChangePage).toHaveBeenCalledWith(2);
    expect(adminService.getActiveTeams).toHaveBeenCalled();
  }));
});
