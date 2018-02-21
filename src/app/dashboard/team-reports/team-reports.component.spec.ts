import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamReportsComponent } from './team-reports.component';

describe('TeamReportsComponent', () => {
  let component: TeamReportsComponent;
  let fixture: ComponentFixture<TeamReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
