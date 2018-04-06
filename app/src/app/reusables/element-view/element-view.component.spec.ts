import { ReportService } from './../../../services/report.service';
import { Observation } from './../../../models/observation.model';
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
  let routeServiceStub;
  let mockMedia;
  let isAll;
  let isPhotos;
  let isVideo;
  let isVoice;
  const observation = new Observation('1', 'mockTitle', 'mockDescription', 'req', null, 'mockMedia', null, false);

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
      getObservation: jasmine.createSpy('getObservation').and.callFake(() => {
        return observation;
      }),
      getMedia: jasmine.createSpy('getMedia').and.callFake(() => {
        Promise.resolve(true);
      }),
    };
    TestBed.configureTestingModule({
      declarations: [ ElementViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { 'id': '1' } } } },
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: Location, useValue: locationServiceStub },
        {provide: ReportService, useValue: reportServiceStub}
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementViewComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    reportServiceStub.getObservation('1');
    component.data = observation;
    mockMedia = [{ id: '1', type: 'Photo' }, { id: '2', type: 'Audio' }, { id: '3', type: 'Video' }];
    component.mediaSelected = mockMedia;
    isAll = true;
    component.isAll = isAll;
    component.isPhotos = isPhotos = false;
    component.isVideo = isVideo = false;
    component.isVoice = isVoice = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch media(Photo, Video, Audio) on ngOnInit', () => {
    reportServiceStub.getMedia("1", 'Photo');
    reportServiceStub.getMedia("1", 'Video');
    reportServiceStub.getMedia("1", 'Audio');
    expect(reportServiceStub.getMedia).toHaveBeenCalledTimes(3);
  });

  it('should create with observation elements', () => {
    expect(component.data.title).toBe("mockTitle");
    expect(component.data.requirement).toBe("req");
    expect(component.data.description).toBe("mockDescription");
  });

  it('should select All Media', () => {
    spyOn(component, 'getMediaAll');
    spyOn(component, 'setInActive');
    let buttonEl = fixture.debugElement.query(By.css('#isAll'));
    buttonEl.nativeElement.click();
    expect(component.getMediaAll).toHaveBeenCalledTimes(1);
    component.setInActive();
    expect(component.setInActive).toHaveBeenCalledTimes(1);
    expect(component.isAll).toBeTruthy();
  });

  it('should select only Photos', () => {
    spyOn(component, 'getPhotos');
    spyOn(component, 'setInActive');
    let buttonEl = fixture.debugElement.query(By.css('#isPhotos'));
    buttonEl.nativeElement.click();
    component.setInActive();
    expect(component.setInActive).toHaveBeenCalledTimes(1);
    expect(component.getPhotos).toHaveBeenCalledTimes(1);
    component.isAll = !isAll;
    component.isPhotos = !isPhotos;
    expect(component.isAll).toBeFalsy();
    expect(component.isPhotos).toBeTruthy();
  });

  it('should select only Audio', () => {
    spyOn(component, 'getVoice');
    spyOn(component, 'setInActive');
    let buttonEl = fixture.debugElement.query(By.css('#isVoice'));
    buttonEl.nativeElement.click();
    expect(component.getVoice).toHaveBeenCalledTimes(1);
    component.setInActive();
    expect(component.setInActive).toHaveBeenCalledTimes(1);
    component.isAll = !isAll;
    component.isVoice = !isVoice;
    expect(component.isAll).toBeFalsy();
    expect(component.isVoice).toBeTruthy();
  });

  it('should select only Video', () => {
    spyOn(component, 'getVideo');
    spyOn(component, 'setInActive');
    let buttonEl = fixture.debugElement.query(By.css('#isVideo'));
    buttonEl.nativeElement.click();
    expect(component.getVideo).toHaveBeenCalledTimes(1);
    component.setInActive();
    expect(component.setInActive).toHaveBeenCalledTimes(1);
    component.isAll = !isAll;
    component.isVideo = !isVideo;
    expect(component.isAll).toBeFalsy();
    expect(component.isVideo).toBeTruthy();
  });

  it('should change locations when `back arrow` button is clicked', () => {
    spyOn(component, 'onLocationChange');
    let buttonEl = fixture.debugElement.query(By.css('.location-change'));
    buttonEl.nativeElement.click();
    expect(component.onLocationChange).toHaveBeenCalledTimes(1);
    expect(locationServiceStub.back).toBeTruthy();
  });
});
