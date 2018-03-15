import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TeamModalComponent } from './team-modal.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerService } from 'ngx-color-picker';

describe('TeamModalComponent', () => {
  let component: TeamModalComponent;
  let fixture: ComponentFixture<TeamModalComponent>;
  let modalInfo: any;
  let teamInfo: any;
  let buttonEl: DebugElement;
  let colorPickerStub: any;

  beforeEach(async(() => {
    colorPickerStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ TeamModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: ColorPickerService, useValue: colorPickerStub}],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamModalComponent);
    component = fixture.componentInstance;
    
    modalInfo = {
      edit: false,
      header: "mock header",
      conformationYes: "confirm",
      conformationNo: "cancel"
    };

    teamInfo = {
      name: "mockTeam",
      color: "#000000",
      id: 1,
    }
    component.modal = modalInfo;
    fixture.detectChanges();
  });
  
  it('should create with passed in modal info', () => {
    expect(component).toBeTruthy();
    expect(component.modal.header).toBe("mock header");
  })
  
  it('should create with custom modal data when adding a new Team', () => {
    expect(component.color).toBe("#FDB913");
    expect(component.team).toBeFalsy();
  });
  
  it('should create with custom modal data and current team data when editing', () => {
    modalInfo.edit = true;
    component.team = teamInfo;
    expect(component.modal.header).toBe("mock header");
    expect(component.team).toBeTruthy();
    expect(component.team.color).toBe("#000000");
  });
  it('should add or update a teams information when submit is clicked', fakeAsync(() => {
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
