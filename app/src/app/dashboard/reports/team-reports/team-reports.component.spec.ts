import { LoadingService } from './../../../../services/loading.service';
import { BasicUser } from './../../../../models/user.model';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TeamReportsComponent } from './team-reports.component';
import { Team } from '../../../../models/team.model';
import { ProfileService } from '../../../../services/profile.service';
import {parseInit} from '../../../../services/testing.service';
import { Observable } from 'rxjs/Observable';

parseInit();

describe('TeamReportsComponent', () => {
  let component: TeamReportsComponent;
  let fixture: ComponentFixture<TeamReportsComponent>;
  let compiled;
  let loadingServiceStub: any;

  beforeEach(async(() => {
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ TeamReportsComponent ],
      providers: [
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
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

  it('should render correct title', () => {
    expect(compiled.querySelector('.dashboard__title').textContent).toContain('Team Inspections');
  });

  it('should render correct number of team cards', fakeAsync(() => {
    const profileService = fixture.debugElement.injector.get(ProfileService);
    const admin = new BasicUser('123', 'mockFirstName', 'mockLastName', 'mockName', [],
      'mockEmail', 'mockImage', null, {}, null, null);
    const teams = [
      new Team('team-1-id', 'team1', admin, 'blue', true),
      new Team('team-2-id', 'team2', admin, 'red', true),
    ];
    spyOn(profileService, 'getTeams').and.returnValue(Promise.resolve(teams));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const links = compiled.querySelectorAll('a');
    teams.forEach((team, index) => {
      let link = links[index].href;
      link = link.split('/').pop();
      expect(team.id).toBe(link);
    });
    expect(compiled.querySelectorAll('team-card').length).toBe(2);
  }));
});
