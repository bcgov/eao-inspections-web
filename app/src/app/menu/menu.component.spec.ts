import { LoadingService } from './../../services/loading.service';
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
import { ToastrService } from 'ngx-toastr';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let authServiceStub: any;
  let modalServiceStub: any;
  let buttonEl: DebugElement;
  let toastServiceStub: any;
  let loadingServiceStub: any;

  beforeEach(async(() => {
    authServiceStub = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.callFake(() => {
        return {
          isAuthenticated: true,
          id: 1,
          access: {
            isAdmin: false,
            isSuperAdmin: false
          },
        };
      }),
      isAdmin: jasmine.createSpy('isAdmin').and.callFake(() => {
        return {
          isAuthenticated: true,
          access: {
            isAdmin: true,
            isSuperAdmin: false
          },
        };
      }),
    };

    toastServiceStub = {
      success(): Observable<any> {
        return Observable.of(true);
      },
      error(): Observable<any> {
        return Observable.of(true);
      }
    };

    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading(): Observable<any> {
        return Observable.of(true);
      }
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
        {provide: ModalService, useValue: modalServiceStub},
        {provide: ToastrService, useValue: toastServiceStub},
        {provide: LoadingService, useValue: loadingServiceStub}
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

  it('should create if user is authenticated', fakeAsync(() => {
    expect(component).toBeTruthy();
    spyOn(component, "isAuth");
    component.isAuth();
    expect(component.isAuth).toHaveBeenCalled();
    tick();
    fixture.detectChanges();
    authServiceStub.isAuthenticated();
    expect(authServiceStub.isAuthenticated).toHaveBeenCalled();
  }));

  it('should check if user is Superadmin/admin and change views', fakeAsync(() => {
    spyOn(component, "isAdmin");
    component.isAdmin();
    expect(component.isAdmin).toHaveBeenCalled();
    tick();
    fixture.detectChanges();
    authServiceStub.isAdmin();
  }));
});
 