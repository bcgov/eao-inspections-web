import { ProfileService } from './../../../services/profile.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';
import { DebugElement } from '@angular/core';
import { Ng2ImgMaxService, Ng2ImgMaxModule } from 'ng2-img-max';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let profileInfo: any;
  let uploadDe: DebugElement;
  let profileServiceStub;
  let toastServiceStub;

  beforeEach(async(() => {
    toastServiceStub = {
      success(): Observable<any> {
        return Observable.of(true);
      },
      error(): Observable<any> {
        return Observable.of(true);
      }
    };
    profileServiceStub = {
      updateProfileImage: jasmine.createSpy('updateProfileImage').and.callFake(() => {
        return 
      })
    };
    TestBed.configureTestingModule({
      declarations: [ ProfileCardComponent ],
      providers: [
        { provide: ProfileService, useVlaue: profileServiceStub},
        { provide: ToastrService, useVlaue: toastServiceStub },
        Ng2ImgMaxService
      ],
      imports: [Ng2ImgMaxModule]
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
      access: {
        isAdmin: false,
        
      }
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
    expect(component.profile.access.isAdmin).toBeFalsy();
    uploadDe = fixture.debugElement.query(By.css('.profile__card--photo__container__upload'));
    expect(uploadDe).toBeTruthy();
  });
});
