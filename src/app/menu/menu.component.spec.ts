import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuComponent } from './menu.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs/Observable';
import { RouterModule } from '@angular/router';
import { DebugElement } from '@angular/core/src/debug/debug_node';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let authServiceStub: any;
  let modalServiceStub: any;
  let buttonEl: DebugElement;

  beforeEach(async(() => {
    authServiceStub = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.callFake(() => {
        return {
          isAuthenticated: true,
          id: 1,
          isAdmin: false
        };
      }),
      isAdmin: jasmine.createSpy('isAdmin').and.callFake(() => {
        return {
          isAuthenticated: true,
          isAdmin: true
        };
      }),
    };

    modalServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };
    
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        NgbModal,
        {provide: AuthService, useValue: authServiceStub},
        {provide: ModalService, useValue: modalServiceStub}
        ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [NgbModule.forRoot(), RouterTestingModule ],
    }).compileComponents();
    
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create if user is authenticated', () => {
    expect(component).toBeTruthy();
    spyOn(component, "isAuth");
    fixture.detectChanges();
    expect(component.isAuth).toHaveBeenCalled();
  });

  it('modal should open when button is clicked', () => {
    buttonEl = fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(modalServiceStub.open).toBeTruthy();
  });
});
 