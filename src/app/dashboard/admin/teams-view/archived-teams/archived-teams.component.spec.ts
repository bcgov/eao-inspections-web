import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTeamsComponent } from './archived-teams.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArchivedTeamsComponent', () => {
  let component: ArchivedTeamsComponent;
  let fixture: ComponentFixture<ArchivedTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedTeamsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
