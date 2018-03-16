import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchivedTeamsComponent } from './archived-teams.component';

describe('ArchivedTeamsComponent', () => {
  let component: ArchivedTeamsComponent;
  let fixture: ComponentFixture<ArchivedTeamsComponent>;
  let adminServiceStub: any;

  beforeEach(async(() => {
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
      providers: [{ provide: AdminService, useValue: adminServiceStub }],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedTeamsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
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
