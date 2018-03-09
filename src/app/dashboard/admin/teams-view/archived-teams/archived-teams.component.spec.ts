import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTeamsComponent } from './archived-teams.component';

describe('ArchivedTeamsComponent', () => {
  let component: ArchivedTeamsComponent;
  let fixture: ComponentFixture<ArchivedTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedTeamsComponent ]
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
