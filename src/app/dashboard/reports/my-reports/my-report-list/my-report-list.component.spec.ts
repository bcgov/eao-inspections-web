import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportListComponent } from './my-report-list.component';

describe('ReportListComponent', () => {
  let component: MyReportListComponent;
  let fixture: ComponentFixture<MyReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReportListComponent ]
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
