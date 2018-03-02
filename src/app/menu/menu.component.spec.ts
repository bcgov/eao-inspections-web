import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
// import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';

import { MenuComponent } from './menu.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs/Observable';
import { RouterModule } from '@angular/router';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let authServiceStub: any;
  let modalServiceStub: any;
  let routerLinks;
  let linkDes;

  beforeEach(async(() => {
    authServiceStub = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.callFake(() => {
        return {
          id: 1,
          isAdmin: false
        };
      }),
      logout: jasmine.createSpy('logout').and.callFake(
        () => Promise.resolve(true).then(() => {
        })
      )
    };

    modalServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };
    
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: ModalService, useValue: modalServiceStub}
        ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
    }).compileComponents();
    
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  //   linkDes = fixture.debugElement
  //     .queryAll(By.directive(RouterLinkDirectiveStub));
  //   routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  // fit('can get RouterLinks from RouterLinksDirectiveStub', () => {
  //   expect(routerLinks.length).toBe(5, 'should have routerLinks');
  //   expect(routerLinks[0].linkParams).toBe('/my-reports');
  //   expect(routerLinks[1].linkParams).toBe('/team-reports');
  //   expect(routerLinks[2].linkParams).toBe('/search');
  //   expect(routerLinks[3].linkParams).toBe('/profile');
  //   expect(routerLinks[3].linkParams).toBe('/settings');
  // });

  it('should create if user is authenticated', () => {
    expect(component).toBeTruthy();

    // inject([AuthService], (injectService: AuthService) => {
      //   expect(injectService).toBe(authService);
      // })
      // expect(authService.isAuthenticated()).toBeTruthy();
      // spyOn(authService, 'isAuthenticated').and.returnValue(true);
      // expect(component).toBeTruthy();
    });

  fit('when logout button is clicked a modal opens', fakeAsync( () => {
    expect(authServiceStub.isAuthenticated).not.toBeNull();
    let button = fixture.debugElement.nativeElement;
    button.querySelector('.menu__profile__content__link').click();
    tick();
    fixture.detectChanges();
    expect(modalServiceStub.open).toHaveBeenCalled();
  }));
});
 