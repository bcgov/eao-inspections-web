import { By } from '@angular/platform-browser';
import { LoadingService } from './../../../services/loading.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ActivatedRoute} from '@angular/router';
import { ElementViewComponent } from './element-view.component';
import {Inspection} from '../../../models/inspection.model';
import {Observable} from 'rxjs/Observable';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import 'rxjs/add/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = Observable.of({id: '5'});
  }
}

describe('ElementViewComponent', () => {
  let component: ElementViewComponent;
  let fixture: ComponentFixture<ElementViewComponent>;
  let reportServiceStub: any;
  let loadingServiceStub: any;
  let locationServiceStub: any;

  const reports = [
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
  ];
  beforeEach(async(() => {
    loadingServiceStub = {
      loading(): Observable<any> {
        return Observable.of(true);
      },
      showLoading(): Observable<any> {
        return Observable.of(true);
      }
    };
    locationServiceStub = {
      back(): Observable<any> {
        return Observable.of(true);
      },
    };
    reportServiceStub = {
      getMyReports: jasmine.createSpy('getMyReports').and.callFake(() => {
        return reports;
      }),
      getObservation: jasmine.createSpy('getObservation').and.callFake(() => {
        return Observable.of(true);
      }),
    };
    TestBed.configureTestingModule({
      declarations: [ ElementViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide : ActivatedRoute, useClass: MockActivatedRoute},
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: Location, useValue: locationServiceStub }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change locations when `back arrow` button is clicked', () => {
    spyOn(component, 'onLocationChange');
    let buttonEl = fixture.debugElement.query(By.css('.location-change'));
    buttonEl.nativeElement.click();
    expect(component.onLocationChange).toHaveBeenCalledTimes(1);
    expect(locationServiceStub.back).toBeTruthy();
  });
});
