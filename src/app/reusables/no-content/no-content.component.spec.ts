import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentComponent } from './no-content.component';

describe('NoContentComponent', () => {
  let component: NoContentComponent;
  let fixture: ComponentFixture<NoContentComponent>;
  let mockData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentComponent);
    component = fixture.componentInstance;
    
    mockData = { image: "mockImage.png", message: "Mock message"}
    component.emptyContent = mockData;
    fixture.detectChanges();
  });

  it('should create with appropiate data', () => {
    expect(component).toBeTruthy();
    expect(component.emptyContent.image).toBe("mockImage.png");
    expect(component.emptyContent.message).toBeTruthy("Mock Message");
  });
});
