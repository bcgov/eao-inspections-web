import { By } from '@angular/platform-browser';
import { ReportService } from './../../../../../services/report.service';
import { LoadingService } from './../../../../../services/loading.service';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ReportViewListComponent } from './report-view-list.component';
import {Inspection} from '../../../../../models/inspection.model';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {OrderByPipe} from '../../../../directives/orderby.pipe';
import {ActivatedRoute} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../../../../models/team.model';
import { Location } from '@angular/common';

describe('ReportViewListComponent', () => {
  let component: ReportViewListComponent;
  let fixture: ComponentFixture<ReportViewListComponent>;
  let compiled;
  let loadingServiceStub;
  let mockData: any;
  let mockTeam: any;
  let locationServiceStub: any;

  beforeEach(async(() => {
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading(): Observable<any> {
        return Observable.of(true);
      }
    };
    locationServiceStub = {
      back(): Observable<any> {
        return Observable.of(true);
      },
    };

    TestBed.configureTestingModule({
      declarations: [ ReportViewListComponent, OrderByPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{provide : ActivatedRoute, useValue: {snapshot: {params: {'id': 'team-id-1'}}}},
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: Location, useValue: locationServiceStub }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render table for no reports', () => {
    fixture.detectChanges();
    mockData = [];
    component.data = mockData;
    expect(compiled.querySelectorAll('report-list-item').length).toBe(0)
    expect(compiled.querySelectorAll('no-content')).toBeTruthy();
  });

  it('should render table for data', () => {
    mockData = ['something'];
    component.data = mockData;
    fixture.detectChanges();
    const headers = [
      'Title',
      'Linked Projects',
      'Inspector',
      'Submitted',
      'Action'
    ];
    (compiled.querySelectorAll('th')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    })
  });

  it('should render the correct number of report items', () => {
    mockData = [
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    ];
    component.data = mockData;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(3);
  });

  it('should fetch more data on page change', fakeAsync(() => {
    const reportService = fixture.debugElement.injector.get(ReportService);
    mockTeam = new Team('team-1-id', 'team1', null, 'blue', true);
    spyOn(component, 'onChangePage').and.returnValue(Promise.resolve(true));
    spyOn(reportService, 'getActiveTeamReports').and.returnValue(Promise.resolve(mockData));
    component.onChangePage(2);
    reportService.getActiveTeamReports(mockTeam);
    expect(component.onChangePage).toHaveBeenCalledWith(2);
    expect(reportService.getActiveTeamReports).toHaveBeenCalled();
    mockData = [
      new Inspection('4', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('5', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('6', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('7', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('8', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('9', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    ];
    component.data = mockData;
    tick();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(6);
  }));

  it('should change locations when `back arrow` button is clicked', () => {
    spyOn(component, 'onLocationChange');
    let buttonEl = fixture.debugElement.query(By.css('.location-change'));
    buttonEl.nativeElement.click();
    expect(component.onLocationChange).toHaveBeenCalledTimes(1);
    expect(locationServiceStub.back).toBeTruthy();
  });
});
