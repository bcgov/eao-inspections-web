import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArchiveModalComponent } from './archive-modal.component';

describe('ArchiveModalComponent', () => {
  let component: ArchiveModalComponent;
  let fixture: ComponentFixture<ArchiveModalComponent>;
  let modalInfo: any;
  let mockData: any;
  let buttonEl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveModalComponent);
    component = fixture.componentInstance;
    mockData = { isActive: true, objectId: "1" };
    component.data = mockData;
    modalInfo = { message: "mock message", conformationYes: "archive", conformationNo: "cancel" };
    component.modal = modalInfo;
    fixture.detectChanges();
  });

  it('should create with appropiate data', () => {
    expect(component).toBeTruthy();
    expect(component.modal.conformationYes).toBe("archive");
    expect(component.modal.conformationNo).toBe("cancel");
    expect(component.modal.message).toBe("mock message");
  });

  it('should archive/unarchive data with correct ID', fakeAsync(() => {
    spyOn(component, 'conformation');
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn--dark').click();
    tick();
    fixture.detectChanges();
    expect(component.conformation).toHaveBeenCalledWith("1");
    }));
});
