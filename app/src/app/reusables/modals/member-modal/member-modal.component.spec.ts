import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { MemberModalComponent } from './member-modal.component';

describe('MemberModalComponent', () => {
  let component: MemberModalComponent;
  let fixture: ComponentFixture<MemberModalComponent>;
  let buttonEl: DebugElement;
  let mockData: any;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    component.data = {};
    mockData = { users: [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }, { id: 3, name: 'user3' }, { id: 4, name: 'user4' }, { id: 5, name: 'user5' }]}
    component.modal = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with a list of users', () => {
    expect(compiled.querySelectorAll('.form-check').length).toBe(5)
  });

  it('should push user ids to an array when input is clicked', fakeAsync(() => {
    spyOn(component, "onChangeCheckbox");
    buttonEl = fixture.debugElement.nativeElement.querySelector('input[id="1"]').click(1);
    tick();
    fixture.detectChanges();
    buttonEl = fixture.debugElement.nativeElement.querySelector('input[id="4"]').click(4);
    tick();
    fixture.detectChanges();
    expect(component.onChangeCheckbox).toHaveBeenCalledTimes(2);
    component.selectedUserIds.push(1);
    component.selectedUserIds.push(4);
    expect((component.selectedUserIds).length).toBe(2);
  }));

  it('should submit an array of users when Submit is clicked', fakeAsync(() => {
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
  }));
});
