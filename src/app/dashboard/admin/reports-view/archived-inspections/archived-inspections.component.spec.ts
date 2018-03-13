import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedInspectionsComponent } from './archived-inspections.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArchivedInspectionsComponent', () => {
  let component: ArchivedInspectionsComponent;
  let fixture: ComponentFixture<ArchivedInspectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedInspectionsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
