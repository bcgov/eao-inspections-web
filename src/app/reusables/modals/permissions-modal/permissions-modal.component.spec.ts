import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PermissionsModalComponent } from './permissions-modal.component';

describe('PermissionsModalComponent', () => {
  let component: PermissionsModalComponent;
  let fixture: ComponentFixture<PermissionsModalComponent>;
  let mockData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsModalComponent);
    component = fixture.componentInstance;

    mockData = {title: "mockTitle"}
    component.data = mockData;
    component.modal = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct data', () => {
    expect(component.data.title).toBe("mockTitle");
  });
});
