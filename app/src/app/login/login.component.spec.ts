import { ModalService } from './../../services/modal.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

class MockAuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: MockAuthService;
  let toastServiceStub;
  let modalServiceStub;

  beforeEach(async(() => {
    toastServiceStub = {
      success(): Observable<any> {
        return Observable.of(true);
      },
      error(): Observable<any> {
        return Observable.of(true);
      }
    };

    modalServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };


    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ToastrService, useValue: toastServiceStub },
        { provide: ModalService, useValue: modalServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new MockAuthService();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
