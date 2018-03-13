import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'permissions-modal',
  templateUrl: './permissions-modal.component.html',
  styleUrls: ['./permissions-modal.component.scss']
})
export class PermissionsModalComponent {
  permissions = ["Administrator", "Superadmin", "Inspector"];
  @Input('modal') modal: any;
  @Input('data') data: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onSubmit() {
    this.submitValue.emit();
  }

  close() {
    this.closeValue();
  }

}
