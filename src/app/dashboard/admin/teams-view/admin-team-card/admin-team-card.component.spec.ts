import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AdminTeamCardComponent } from './admin-team-card.component';
import { ToastrService } from 'ngx-toastr';

describe('AdminTeamCardComponent', () => {
  let component: AdminTeamCardComponent;
  let fixture: ComponentFixture<AdminTeamCardComponent>;
  let teamInfo: any;
  let modalServiceStub: any;
  let adminServiceStub: any;
  let toastServiceStub: any;
  let buttonEl: DebugElement;

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
      declarations: [ AdminTeamCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ToastrService, useValue: toastServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamCardComponent);
    component = fixture.componentInstance;

    teamInfo = {id: 1, name: "mockName", isActive: true }
    component.team = teamInfo;
    fixture.detectChanges();
  });

  it('should create with Team Name and badge', () => {
    expect(component).toBeTruthy();
    expect(component.team.name).toBe("mockName");
  });

  it('should allow superAdmin to edit team info', fakeAsync(() => {
    spyOn(component, 'onEdit').and.returnValue(Promise.resolve(true));
    component.onEdit(component.team.id);
    tick();
    fixture.detectChanges();
    expect(component.onEdit).toHaveBeenCalledWith(component.team.id);
    adminServiceStub.updateTeam(component.team.id);
    tick();
    fixture.detectChanges();
    expect(adminServiceStub.updateTeam).toHaveBeenCalledWith(component.team.id);
    expect(toastServiceStub).not.toBeNull();
  }));

  it('should allow superAdmin to archive a team', fakeAsync(() => {
    spyOn(component, 'onArchive').and.returnValue(Promise.resolve(true));
    component.onArchive(component.team.id);
    tick();
    fixture.detectChanges();
    expect(component.onArchive).toHaveBeenCalledWith(component.team.id);
    adminServiceStub.archiveTeams(component.team.id);
    tick();
    fixture.detectChanges();
    expect(adminServiceStub.archiveTeams).toHaveBeenCalledWith(component.team.id);
    expect(toastServiceStub).not.toBeNull();
  }));

  it('should allow superAdmin to unArchive a team if team is not active', fakeAsync(() => {
    teamInfo.isActive = false;
    spyOn(component, 'onUnarchive').and.returnValue(Promise.resolve(true));
    component.onUnarchive(component.team.id);
    tick();
    fixture.detectChanges();
    expect(component.onUnarchive).toHaveBeenCalledWith(component.team.id);
    adminServiceStub.unArchiveTeams(component.team.id);
    tick();
    fixture.detectChanges();
    expect(adminServiceStub.unArchiveTeams).toHaveBeenCalledWith(component.team.id);
    expect(toastServiceStub).not.toBeNull();
  }));
});
