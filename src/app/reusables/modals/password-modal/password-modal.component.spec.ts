import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordModalComponent } from './password-modal.component';

describe('PasswordModalComponent', () => {
  let component: PasswordModalComponent;
  let fixture: ComponentFixture<PasswordModalComponent>;
  let mockData;
  let mockModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordModalComponent);
    component = fixture.componentInstance;

    mockModal = { message: "Update Password" }
    mockData = { password: "mockPassword"}
    component.data = mockData;
    component.modal = mockModal;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
