import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListItemComponent } from './report-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReportListItemComponent', () => {
  let component: ReportListItemComponent;
  let fixture: ComponentFixture<ReportListItemComponent>;
  let reportInfo: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListItemComponent ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListItemComponent);
    component = fixture.componentInstance;
    reportInfo = { title: 'mockTitle', image: 'mock-image.png', project: 'mockProjectName', team: 'mockTeam', updatedAt: 'mockDate' };
    component.data = reportInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display appropiate report data', () => {
    expect(component.data.title).toBe('mockTitle');
    expect(component.data.team).toBe('mockTeam');
    expect(component.data.image).toBe('mock-image.png');
    expect(component.data.project).toBe('mockProjectName');
    expect(component.data.updatedAt).toBe('mockDate');
  });
});
