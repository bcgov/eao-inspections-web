import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedInspectionsComponent } from './archived-inspections.component';

describe('ArchivedInspectionsComponent', () => {
  let component: ArchivedInspectionsComponent;
  let fixture: ComponentFixture<ArchivedInspectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedInspectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
