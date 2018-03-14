import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewListComponent } from './report-view-list.component';

describe('ReportViewListComponent', () => {
  let component: ReportViewListComponent;
  let fixture: ComponentFixture<ReportViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
