import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onSubmit(email) {
    this.submitValue.emit(email.value);
  }

  close() {
    this.closeValue();
  }

  ngOnInit() {
  }

}
