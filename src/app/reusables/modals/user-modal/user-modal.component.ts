import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  @Input('modal') modal: any;
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
