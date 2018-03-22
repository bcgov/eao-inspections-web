import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportsComponent } from './my-reports.component';
import {ReportService} from '../../../../services/report.service';
import {Inspection} from '../../../../models/inspection.model';
import {RouterTestingModule} from '@angular/router/testing';

describe('MyReportsComponent', () => {
  let component: MyReportsComponent;
  let fixture: ComponentFixture<MyReportsComponent>;
  let reportServiceStub: any;
  let compiled;
  const reports = [
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
  ];
  beforeEach(async(() => {
    reportServiceStub = {
      getMyReports: jasmine.createSpy('getMyReports').and.callFake(() => {
        return reports;
      }),
    };
    TestBed.configureTestingModule({
      declarations: [ MyReportsComponent ],
      providers: [
        { provide: ReportService, useValue: reportServiceStub },
        RouterTestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const mockReports = [
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    ];
    component.data = mockReports;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
