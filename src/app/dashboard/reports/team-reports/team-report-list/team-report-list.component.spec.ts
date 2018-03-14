import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeamReportListComponent } from './team-report-list.component';
import { Team } from '../../../../../models/team.model';
import { ProfileService } from '../../../../../services/profile.service';
import { TeamService } from '../../../../../services/team.service';
import { OrderByPipe } from '../../../../directives/orderby.pipe';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../../../services/report.service';
import { Inspection } from '../../../../../models/inspection.model';

describe('TeamReportListComponent', () => {
  let component: TeamReportListComponent;
  let fixture: ComponentFixture<TeamReportListComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReportListComponent, OrderByPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{provide : ActivatedRoute, useValue: {snapshot: {params: {'id': 'team-id-1'}}}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shodld render correct team name', fakeAsync(() => {
    const teamService = fixture.debugElement.injector.get(TeamService);
    const team = new Team('team-1-id', 'team1', 'admin1');
    spyOn(teamService, 'getTeam').and.returnValue(Promise.resolve(team));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('.dashboard__title').textContent).toContain(team.name);
  }));

  it('shodld render correct table headers', () => {
    const headers = [
      'Title',
      'Linked Projects',
      'Submitted',
      'Inspector',
      'Action'
    ];
    (compiled.querySelectorAll('th')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    });
  });

  it('shodld render the correct number of report items', fakeAsync(() => {
    const reportService = fixture.debugElement.injector.get(ReportService);
    const reports = [
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, 'test'),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, 'test'),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, 'test'),
    ];
    spyOn(reportService, 'getTeamReports').and.returnValue(Promise.resolve(reports));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(3);
  }));

});
