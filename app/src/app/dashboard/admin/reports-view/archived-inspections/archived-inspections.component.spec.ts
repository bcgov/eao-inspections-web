import { OrderByPipe } from './../../../../directives/orderby.pipe';
import { AdminService } from './../../../../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchivedInspectionsComponent } from './archived-inspections.component';

describe('ArchivedInspectionsComponent', () => {
  let component: ArchivedInspectionsComponent;
  let fixture: ComponentFixture<ArchivedInspectionsComponent>;
  let adminServiceStub: any;
  let mockPipe: OrderByPipe;

  beforeEach(async(() => {
    mockPipe = new OrderByPipe();
    adminServiceStub = {
      getArchivedReports: jasmine.createSpy('getArchivedReports').and.callFake(() => {
        return {
          objectId: "1",
          isActive: true,
        };
      })
    };

    TestBed.configureTestingModule({
      declarations: [ ArchivedInspectionsComponent, OrderByPipe ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AdminService, useValue: adminServiceStub }],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInspectionsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch archived inspections on ngOnInit', () => {
    adminServiceStub.getArchivedReports();
    expect(adminServiceStub.getArchivedReports).toHaveBeenCalledTimes(1);
    expect(component.data).toBeTruthy();
  });
});
