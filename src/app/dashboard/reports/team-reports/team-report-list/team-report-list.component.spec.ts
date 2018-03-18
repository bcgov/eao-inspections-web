import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeamReportListComponent } from './team-report-list.component';
import { Team } from '../../../../../models/team.model';
import { TeamService } from '../../../../../services/team.service';
import { OrderByPipe } from '../../../../directives/orderby.pipe';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../../../services/report.service';
import { Inspection } from '../../../../../models/inspection.model';

describe('TeamReportListComponent', () => {
  let component: TeamReportListComponent;
  let fixture: ComponentFixture<TeamReportListComponent>;
  let compiled;
  const reports = [
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
  ];

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

  it('should render correct team name', fakeAsync(() => {
    component.data = reports;
    const teamService = fixture.debugElement.injector.get(TeamService);
    const team = new Team('team-1-id', 'team1', 'admin1', 'testColor1', true, 'testBadge');
    spyOn(teamService, 'getTeam').and.returnValue(Promise.resolve(team));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('.dashboard__title').textContent).toContain(team.name);
  }));

  it('should render correct table headers', () => {
    const headers = [
      'Title',
      'Linked Projects',
      'Inspector',
      'Submitted',
      'Action'
    ];
    (compiled.querySelectorAll('th')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    });
  });

  it('should render the correct number of report items', fakeAsync(() => {
    const reportService = fixture.debugElement.injector.get(ReportService);

    spyOn(reportService, 'getTeamReports').and.returnValue(Promise.resolve(reports));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(3);
  }));

});
