import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('data') data: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  close() {
    this.closeValue();
  }

  onSubmit(form: NgForm) {
     const password = form.value.password;
     const id = this.data.id;
    this.submitValue.emit({ id, password });
  }

  ngOnInit() {
  }

}
