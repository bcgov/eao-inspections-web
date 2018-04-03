import { Team } from './../../../../../models/team.model';
import { LoadingService } from './../../../../../services/loading.service';
import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeamReportListComponent } from './team-report-list.component';
import { TeamService } from '../../../../../services/team.service';
import { OrderByPipe } from '../../../../directives/orderby.pipe';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../../../services/report.service';
import { Inspection } from '../../../../../models/inspection.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BasicUser } from '../../../../../models/user.model';

describe('TeamReportListComponent', () => {
  let component: TeamReportListComponent;
  let fixture: ComponentFixture<TeamReportListComponent>;
  let compiled;
  let mockPipe: OrderByPipe;
  let loadingServiceStub: any;
  let team;
  let teamAdmin;

  const reports = [
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
  ];

  beforeEach(async(() => {
    mockPipe = new OrderByPipe();
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ TeamReportListComponent, OrderByPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide : ActivatedRoute, useValue: {snapshot: {params: {'id': 'team-id-1'}}}},
        { provide: LoadingService, useValue: loadingServiceStub }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    component.data = reports;
    teamAdmin = new BasicUser('1', 'mockName', "mockLastName", "mockFullName", [], "mockEmail", "mockImage", null, {}, true, true);
    team = new Team('team-1-id', 'team1', teamAdmin, 'testColor1', true, 'testBadge');
    component.team = team;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct team data', () => {
    expect(component.team.name).toBe("team1");
    expect(component.team.badge).toBe("testBadge");
    expect(component.team.admin.name).toBe("mockFullName");
  });

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

    spyOn(reportService, 'getActiveTeamReports').and.returnValue(Promise.resolve(reports));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(3);
  }));

});
