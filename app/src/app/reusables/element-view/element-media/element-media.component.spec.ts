import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMediaComponent } from './element-media.component';

describe('ElementMediaComponent', () => {
  let component: ElementMediaComponent;
  let fixture: ComponentFixture<ElementMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
