import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { PasswordModalComponent } from './password-modal.component';

describe('PasswordModalComponent', () => {
  let component: PasswordModalComponent;
  let fixture: ComponentFixture<PasswordModalComponent>;
  let mockData;
  let mockModal;
  let buttonEl: DebugElement;
  
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
  
  it('should create with users current password', fakeAsync(() => {
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      expect(el.value).toBe(component.data.password);
    });
  }))
  
  it('should change password and enable submit if confirmPassword === password', fakeAsync(() => {
    const newPassword: string = "password";
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    let buttonEl = button.nativeElement;
    let input = fixture.debugElement.query(By.css('input[name="password"]'));
    let confirmInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
    let el = input.nativeElement;
    let confirmEl = confirmInput.nativeElement;
    el.value = newPassword;
    confirmEl.value = newPassword;
    expect(el.value).toEqual(confirmEl.value);
    fixture.detectChanges();
    expect(buttonEl.disabled).toBeFalsy();
  }))

  it('should submit a valid password when `Confirm` is clicked', fakeAsync(() => {
    spyOn(component, "onSubmit");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn--dark').click();
    tick();
    expect(component.onSubmit).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.submitValue).not.toBeNull();
  }))

  it('should close when close() is called', fakeAsync(() => {
    spyOn(component, "close");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn').click();
    tick();
    expect(component.close).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.closeValue).not.toBeNull();
  }))
});
