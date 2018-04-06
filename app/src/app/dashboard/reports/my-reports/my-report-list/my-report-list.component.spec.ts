import { LoadingService } from './../../../../../services/loading.service';
import { ReportService } from './../../../../../services/report.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderByPipe } from '../../../../directives/orderby.pipe';
import { Observable } from 'rxjs/Observable';

import { MyReportListComponent } from './my-report-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import {Inspection} from '../../../../../models/inspection.model';

describe('MyReportListComponent', () => {
  let component: MyReportListComponent;
  let fixture: ComponentFixture<MyReportListComponent>;
  let reportServiceStub: any;
  let loadingServiceStub;
  let compiled;
  let mockData: any;

  beforeEach(async(() => {
    reportServiceStub = {
      getMyReports: jasmine.createSpy('getMyReports').and.callFake(() => {
        return {
          title: {},
          subtitle: {},
          id: {},
          project: {},
          end: {}
        };
      }),
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
      declarations: [ MyReportListComponent, OrderByPipe ],
      providers: [
        { provide: ReportService, useValue: reportServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render table for no reports', () => {
    fixture.detectChanges();
    mockData = [];
    component.data = mockData;
    expect(compiled.querySelectorAll('report-list-item').length).toBe(0);
    // expect(compiled.querySelector('no-content')).toBeTruthy();
  });

  it('should render table for data', () => {
    mockData = ['something'];
    component.data = mockData;
    fixture.detectChanges();
    const headers = [
      'Title',
      'Linked Projects',
      'Team',
      'Submitted',
      'Action'
    ];
    (compiled.querySelectorAll('th')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    });
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

});
