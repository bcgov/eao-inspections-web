import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';
import { DebugElement } from '@angular/core';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let profileInfo: any;
  let uploadDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;

    profileInfo = {
      id: 1,
      name: "Clara Logan",
      team: "Team 2",
      email: "clara12@email.com",
      image: "users.png",
      isAdmin: false
    };
    component.profile = profileInfo;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should contain profile image, name, team, email ", () => {
    expect(component.profile.name).toBe("Clara Logan");
    expect(component.profile.team).toBe("Team 2");
    expect(component.profile.image).toBe("users.png");
    expect(component.profile.email).toBe("clara12@email.com");
  });
  
  it("should allow users to update their own profile images ", () => {
    expect(component.profile.isAdmin).toBeFalsy();
    uploadDe = fixture.debugElement.query(By.css('.profile__card--photo__upload'));
    expect(uploadDe).not.toBeNull();
  });
});
