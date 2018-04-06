import { ModalService } from './../../../../services/modal.service';
import { AdminService } from './../../../../services/admin.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Ng2ImgMaxService, Ng2ImgMaxModule } from 'ng2-img-max';

import { UserModalComponent } from './user-modal.component';
import { Team } from '../../../../models/team.model';
import { ToastrService } from 'ngx-toastr';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let modalInfo: any;
  let closeValue: any;
  let buttonEl: DebugElement;
  let toastServiceStub: any;
  let modalServiceStub: any;
  let teamsMock: any;
  let userInfo: any;

  beforeEach(async(() => {
    modalServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };
    toastServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ UserModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: ToastrService, useValue: toastServiceStub },
        Ng2ImgMaxService
      ],
      imports: [FormsModule, Ng2ImgMaxModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    
    modalInfo = { 
      edit: false,
      header: "mock header", 
      confirmationYes: "confirm", 
      confirmationNo: "cancel" 
    };

    userInfo = {
      firstName: "mockName",
      lastName: "mockLastName",
      publicEmail: "mockEmail",
      id: "mockEmail",
      permission: "admin"
    }

    component.modal = modalInfo;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
  });
  
  
  it('should create with custom modal data to add new users', () => {
    expect(component.modal.header).toBe("mock header");
  });
  
  it('should create with custom modal data and current user data to edit', () => {
    modalInfo.edit = true;
    component.user = userInfo;
    expect(component.user).toBeTruthy();
    expect(component.modal.header).toBe("mock header");
  });

  it('should add or update a users information when submit is clicked', fakeAsync(() => {
    spyOn(component, "onSubmit");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn--dark').click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should close when close() is called', fakeAsync(() => {
    spyOn(component, "close");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn').click();
    tick();
    expect(component.close).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.closeValue).not.toBeNull();
  }))
});
