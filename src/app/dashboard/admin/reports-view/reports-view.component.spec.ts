import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import { ReportsViewComponent } from './reports-view.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Team} from '../../../../models/team.model';
import {AdminService} from '../../../../services/admin.service';


describe('ReportsViewComponent', () => {
  let component: ReportsViewComponent;
  let fixture: ComponentFixture<ReportsViewComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsViewComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsViewComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct title', () => {
    expect(compiled.querySelector('.dashboard__title').textContent).toContain('Inspections');
  });

  it('should render correct number of team cards', fakeAsync(() => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const teams = [
      new Team('team-1-id', 'team1', 'admin1', 'blue', true),
      new Team('team-2-id', 'team2', 'admin1', 'red', true),
    ];
    spyOn(adminService, 'getActiveTeams').and.returnValue(Promise.resolve(teams));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const links = compiled.querySelectorAll('a');
    teams.forEach((team, index) => {
      let link = links[index + 1].href;
      link = link.split('/').pop();
      expect(team.id).toBe(link);
    });
    expect(compiled.querySelectorAll('team-card').length).toBe(2);
  }));
});
