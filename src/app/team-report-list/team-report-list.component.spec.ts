import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamReportListComponent } from './team-report-list.component';

describe('TeamReportListComponent', () => {
  let component: TeamReportListComponent;
  let fixture: ComponentFixture<TeamReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
