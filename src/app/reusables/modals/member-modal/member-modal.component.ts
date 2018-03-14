import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent {
  permissions = ["Administrator", "Superadmin", "Inspector"];
  @Input('modal') modal: any;
  @Input('data') data: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onSubmit(value) {
    this.submitValue.emit(value);
  }

  close() {
    this.closeValue();
  }
}
