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
    modalInfo = { message: "mock message", confirmationYes: "archive", confirmationNo: "cancel" };
    component.modal = modalInfo;
    fixture.detectChanges();
  });

  it('should create with appropiate data', () => {
    expect(component).toBeTruthy();
    expect(component.modal.confirmationYes).toBe("archive");
    expect(component.modal.confirmationNo).toBe("cancel");
    expect(component.modal.message).toBe("mock message");
  });

  it('should archive/unarchive data with correct ID', fakeAsync(() => {
    spyOn(component, 'confirmation');
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn--dark').click();
    tick();
    fixture.detectChanges();
    expect(component.confirmation).toHaveBeenCalledWith(mockData);
    }));
});
