import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let modalInfo: any;
  let buttonEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;

    modalInfo = { message: "mock message", conformationYes: "confirm", conformationNo: "cancel" }
    component.modal = modalInfo;
    fixture.detectChanges();
  });

  it('should create with custom message and custom buttons', () => {
    expect(component).toBeTruthy();
    expect(component.modal.message).toBe("mock message");
    expect(component.modal.conformationYes).toBe("confirm");
    expect(component.modal.conformationNo).toBe("cancel");
  });

  it('should close when conformation() is called', fakeAsync(() => {
    spyOn(component, "conformation");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn--dark').click();
    tick();
    fixture.detectChanges();
    expect(component.conformation).toHaveBeenCalled();
  }))
  
});