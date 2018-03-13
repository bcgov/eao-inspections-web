import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeamReportsComponent } from './team-reports.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Team } from '../../../../models/team.model';
import { ProfileService } from '../../../../services/profile.service';

describe('TeamReportsComponent', () => {
  let component: TeamReportsComponent;
  let fixture: ComponentFixture<TeamReportsComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReportsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportsComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shodld render correct title', () => {
    expect(compiled.querySelector('.dashboard__title').textContent).toContain('Team Reports')
  });

  it('should render corret number of team cards', fakeAsync(() => {
    const profileService = fixture.debugElement.injector.get(ProfileService);
    const teams = [
      new Team('team-1-id', 'team1', 'admin1'),
      new Team('team-2-id', 'team2', 'admin1'),
    ];
    spyOn(profileService, 'getTeams').and.returnValue(Promise.resolve(teams));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let links = compiled.querySelectorAll('a');
    teams.forEach((team, index) => {
      let link = links[index].href;
      link = link.split('/').pop();
      console.log(link)
      expect(team.id).toBe(link);
    });
    expect(compiled.querySelectorAll('team-card').length).toBe(2);
  }));
});
