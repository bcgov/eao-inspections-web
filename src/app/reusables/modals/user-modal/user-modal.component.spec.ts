import { AdminService } from './../../../../services/admin.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserModalComponent } from './user-modal.component';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let modalInfo: any;
  let closeValue: any;
  let buttonEl: DebugElement;
  // let adminServiceStub: any;
  let teamsMock: any;

  beforeEach(async(() => {
    // adminServiceStub = {
    //   getActiveTeams: jasmine.createSpy('getActiveTeams').and.callFake(() => {
    //     Promise.resolve(teamsMock);
    //   })
    // };

    TestBed.configureTestingModule({
      declarations: [ UserModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: AdminService}
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    
    modalInfo = { 
      header: "mock header", 
      conformationYes: "confirm", 
      conformationNo: "cancel" 
    };
    teamsMock = ["team1"];
    component.modal = modalInfo;
    component.teams = teamsMock;
    fixture.detectChanges();
  });

  it('should create with custom data', () => {
    expect(component).toBeTruthy();
    // expect(component.modal.header).toBe("mock header");
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
    // expect modal to be closed?
  }))
});
