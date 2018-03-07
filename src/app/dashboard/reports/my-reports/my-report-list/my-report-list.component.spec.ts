import { ReportService } from './../../../../../services/report.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyReportListComponent } from './my-report-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyReportListComponent', () => {
  let component: MyReportListComponent;
  let fixture: ComponentFixture<MyReportListComponent>;
  let reportServiceStub: any;

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

    TestBed.configureTestingModule({
      declarations: [ MyReportListComponent ],
      providers: [
        { provide: ReportService, useValue: reportServiceStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
