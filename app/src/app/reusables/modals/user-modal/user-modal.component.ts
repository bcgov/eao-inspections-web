import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as String from '../../../../constants/strings';
import { parseToJSON } from '../../../../services/parse.service';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  selectedPhoto = "../../assets/avatar@2x.png";
  permissions = ["superadmin", "admin", "manager", "inspector", "inspector(view)"];

  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Input('user') user: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  getPhoto(event) {
    this.selectedPhoto = event.target.files[0].name;
  }

  onSubmit(form: NgForm, id?: string) {
    const photo = form.value.photo;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const permission = form.value.permission;
    if (id) {
      this.submitValue.emit({ firstName, lastName, email, permission, id })
    } else {
      this.submitValue.emit({firstName, lastName, email, password, permission});
    }
  }

  close() {
    this.closeValue();
  }

  ngOnInit() {
  }
}
