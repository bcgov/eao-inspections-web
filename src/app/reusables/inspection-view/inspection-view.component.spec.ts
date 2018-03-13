import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionViewComponent } from './inspection-view.component';
import { Inspection } from '../../../models/inspection.model';
import { BasicUser } from '../../../models/user.model';
import { ReportService } from '../../../services/report.service';
import { OrderByPipe } from '../../directives/orderby.pipe';
import { Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Observation } from '../../../models/observation.model';

fdescribe('InspectionViewComponent', () => {
  let component: InspectionViewComponent;
  let fixture: ComponentFixture<InspectionViewComponent>;
  let compiled;

  beforeEach(async(() => {

     TestBed.configureTestingModule({
      declarations: [ InspectionViewComponent, OrderByPipe],
      providers: [{provide : ActivatedRoute, useValue: {snapshot: {params: {'id': 'inspection-id-1'}}}}],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shodld render the correct inspection data', fakeAsync(() => {
    const reportService = fixture.debugElement.injector.get(ReportService);
    const inspector = new BasicUser('testId', 'testInspectorName', [], 'testEmail', 'testImage', false);
    const startDate = new Date();
    const endDate = new Date();
    const inspection = 
      new Inspection('testId', 'testTitle', 'testSubTitle', 'testNumber', inspector,
        'testProject', startDate, endDate, null, 'testRequirement', true, 'testTeam');
    spyOn(reportService, 'getInspection').and.returnValue(Promise.resolve(inspection));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const headers = [
      'title',
      'subtitle',
      'inspection number',
      'inspector',
      'linked project',
      'inspection start date',
      'inspection end date'
    ];
    (compiled.querySelectorAll('h4')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    });

    const details = [
      inspection.title,
      inspection.subtitle,
      inspection.inspectionNumber,
      inspection.inspector.name,
      inspection.project,
      inspection.startDate.toString(),
      inspection.endDate.toString()
    ];

    (compiled.querySelectorAll('p')) .forEach((detail, index) => {
      expect(detail.textContent.trim()).toBe(details[index]);
    });

  }));

  it('shodld render the correct observation data', fakeAsync(() => {
    const reportService = fixture.debugElement.injector.get(ReportService);
    const createdDate = new Date();
    const observations = [
      new Observation('testId1', 'testTitle1', 'testDescription1', 'testRequirement1', null, 'testMedia1', createdDate),
      new Observation('testId2', 'testTitle2', 'testDescription2', 'testRequirement2', null, 'testMedia2', createdDate)
    ]
    spyOn(reportService, 'getObservations').and.returnValue(Promise.resolve(observations));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const headers = [
      'Name',
      'Submitted'
    ];

    (compiled.querySelectorAll('h4')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    });

    (compiled.querySelectorAll('.inspection-details-content')).forEach((detail, index) => {
      expect(detail.querySelector('a').textContent.trim()).toBe(observations[index].title.trim());
      const date = (new Date(detail.querySelector('p').textContent.trim())).toDateString()
      expect(date).toBe(observations[index].createdAt.toDateString());
    });
  }));

});
