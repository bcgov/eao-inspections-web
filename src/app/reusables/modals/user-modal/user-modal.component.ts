import { AdminService } from './../../../../services/admin.service';
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
  teams = [];
  permissions = ["admin", "superadmin", "inspector"];

  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Input('user') user: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor(private adminService: AdminService) { }

  getPhoto(event) {
    console.log(event.target.files[0]);
    this.selectedPhoto = event.target.files[0].name;
  }

  onSubmit(form: NgForm, id?: string) {
    const photo = form.value.photo;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const team = form.value.team;
    const permission = form.value.permission;
    // console.log(this.selectedPhoto);
    if (id) {
      this.submitValue.emit({ firstName, lastName, email, permission, id })
    } else {
      this.submitValue.emit({firstName, lastName, email, password, team, permission});
    }
  }

  close() {
    this.closeValue();
  }

  ngOnInit() {
  this.adminService.getActiveTeams()
    .then((results) => {
      if (results instanceof Array) {
        this.teams = parseToJSON(results);
      }
    });
  }
}
