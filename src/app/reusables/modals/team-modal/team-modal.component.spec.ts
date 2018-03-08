import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { TeamModalComponent } from './team-modal.component';

describe('TeamModalComponent', () => {
  let component: TeamModalComponent;
  let fixture: ComponentFixture<TeamModalComponent>;
  let modalInfo: any;
  let buttonEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamModalComponent);
    component = fixture.componentInstance;
    
    modalInfo = { header: "mock header" }
    component.modal = modalInfo;
    fixture.detectChanges();
  });

  it('should create with custom data', () => {
    expect(component).toBeTruthy();
    expect(component.modal.header).toBe("mock header");
  });
});
