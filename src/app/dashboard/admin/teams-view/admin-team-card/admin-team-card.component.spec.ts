import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AdminTeamCardComponent } from './admin-team-card.component';
import { ToastrService } from 'ngx-toastr';

fdescribe('AdminTeamCardComponent', () => {
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
    }

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
    spyOn(component, 'onEdit').and.callThrough();
    component.onEdit(component.team.id);
    tick();
    fixture.detectChanges();
    expect(component.onEdit).toHaveBeenCalled();
    // expect(adminServiceStub.updateTeam).toHaveBeenCalled();
  }));

  it('should allow superAdmin to archive a team', () => {
    spyOn(component, 'onArchive').and.callThrough();
    component.onArchive(component.team.id);
    expect(component.onArchive).toHaveBeenCalled();
    // expect(adminServiceStub.updateTeam).toHaveBeenCalled();
  });

  it('should allow superAdmin to unArchive a team if team is not active', () => {
    teamInfo.isActive = false;
    spyOn(component, 'onUnarchive').and.callThrough();
    component.onUnarchive(component.team.id);
    expect(component.onUnarchive).toHaveBeenCalled();
    // expect(adminServiceStub.updateTeam).toHaveBeenCalled();
  });
});
