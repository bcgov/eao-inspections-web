import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ReportViewListComponent } from './report-view-list.component';
import {Inspection} from '../../../../../models/inspection.model';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {OrderByPipe} from '../../../../directives/orderby.pipe';
import {ActivatedRoute} from '@angular/router';

describe('ReportViewListComponent', () => {
  let component: ReportViewListComponent;
  let fixture: ComponentFixture<ReportViewListComponent>;
  let compiled;
  let mockData: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportViewListComponent, OrderByPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{provide : ActivatedRoute, useValue: {snapshot: {params: {'id': 'team-id-1'}}}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render table for no reports', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('no-content')).toBeTruthy();
  });

  it('should render table for data', () => {
    mockData = ['something'];
    component.data = mockData;
    fixture.detectChanges();
    const headers = [
      'Title',
      'Linked Projects',
      'Inspector',
      'Submitted',
      'Action'
    ];
    (compiled.querySelectorAll('th')).forEach((header, index) => {
      expect(header.textContent.trim()).toBe(headers[index].trim());
    });
  });

  it('should render the correct number of report items', () => {
    mockData = [
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
      new Inspection('test', 'test', 'test', 'test', null, 'test', null, null, null, 'test', true, null),
    ];
    component.data = mockData;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('report-list-item').length).toBe(3);
  });
});
