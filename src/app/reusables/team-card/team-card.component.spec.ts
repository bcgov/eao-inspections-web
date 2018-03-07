import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeamCardComponent } from './team-card.component';


describe('TeamCardComponent', () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;
  let teamInfo: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    
    teamInfo = { name: "mockName", members: [] }
    component.team = teamInfo;
    fixture.detectChanges();
  });

  it('should create with a team name and member count', () => {
    expect(component).toBeTruthy();
    expect(component.team.name).toEqual("mockName");
    expect((component.team.members).length).toBe(0);
  });
});
