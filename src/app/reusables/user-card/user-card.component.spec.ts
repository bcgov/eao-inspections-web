import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { BasicUser } from './../../../models/user.model';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let userInfo: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCardComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    
    userInfo = { name: "mockName", image: "users.png" }
    component.user = userInfo;
    fixture.detectChanges();
  })
  
  it('should create with a profile image and user name', () => {
    expect(component).toBeTruthy();
    expect(component.user.image).toBe("users.png");
    expect(component.user.name).toBe("mockName");
  });
});
 