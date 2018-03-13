import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamCardComponent } from './admin-team-card.component';

describe('AdminTeamCardComponent', () => {
  let component: AdminTeamCardComponent;
  let fixture: ComponentFixture<AdminTeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
