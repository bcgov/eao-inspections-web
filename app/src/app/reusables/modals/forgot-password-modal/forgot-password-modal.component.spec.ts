import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { ForgotPasswordModalComponent } from './forgot-password-modal.component';
import { FormsModule } from '@angular/forms';

describe('ForgotPasswordModalComponent', () => {
  let component: ForgotPasswordModalComponent;
  let fixture: ComponentFixture<ForgotPasswordModalComponent>;
  let mockModal;
  let buttonEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordModalComponent);
    component = fixture.componentInstance;

    mockModal = { message: "Update Password" }
    component.modal = mockModal;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a valid email when `Send` is clicked', fakeAsync(() => {
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
