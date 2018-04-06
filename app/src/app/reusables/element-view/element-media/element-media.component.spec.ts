import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ElementMediaComponent } from './element-media.component';

describe('ElementMediaComponent', () => {
  let component: ElementMediaComponent;
  let fixture: ComponentFixture<ElementMediaComponent>;
  let mockData: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementMediaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMediaComponent);
    component = fixture.componentInstance;
    mockData = {fileUrl: "mockUrl"}
    component.item = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
