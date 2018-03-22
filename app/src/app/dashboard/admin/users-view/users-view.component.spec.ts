import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersViewComponent } from './users-view.component';
import { AdminService } from './../../../../services/admin.service';

describe('UsersViewComponent', () => {
  let component: UsersViewComponent;
  let fixture: ComponentFixture<UsersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersViewComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [AdminService, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
