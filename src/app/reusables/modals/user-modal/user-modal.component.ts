import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as String from '../../../../constants/strings';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})

export class UserModalComponent implements OnInit {
  selectedPhoto = null;
  teams = ["Team 1", "Team 2", "Team 3"];
  permissions = ["admin", "superadmin", "inspector"];

  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  getPhoto(event) {
    this.selectedPhoto = event.target.files;
  }

  selectPhoto() {
    
  }

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const team = form.value.team;
    const permission = form.value.permission;
    this.submitValue.emit({firstName, lastName, email, password, team, permission});
  }

  close() {
    this.closeValue();
  }
}
