import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.scss']
})
export class ArchiveModalComponent {
  @Input('data') data: any;
  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  conformation(value) {
    console.log("I MADE IT TO STEP ONE " + value);
    this.submitValue.emit(value);
  }

  close() {
    this.closeValue();
  }
}
