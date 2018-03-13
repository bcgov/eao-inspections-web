import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { parseToJSON } from './../../../../../services/parse.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ AdminService ]
})
export class UserListComponent implements OnInit {
  title = 'Users';
  archivedLink = Route.ARCHIVED_USERS;

  modal = {
    header: String.CREATE_USER,
    userButton: String.ADD_BUTTON,
  };

  emptyContent = {
    image: '../../assets/team-member.png',
    message: String.EMPTY_USER,
  };

  users = [];

  constructor(
    private modalService: ModalService,
    private adminService: AdminService,
    private toast: ToastrService
  ) { }

  open(modal) {
    this.modalService.open(modal, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  onSubmit(value) {
    this.adminService.createUser(value.firstName, value.lastName, value.email, value.password, value.team, value.permission).then((results) => {
      if (results) {
        this.toast.success('Successfully added ' + value.firstName + " " + value.lastName);
      }
    });
  }

  ngOnInit() {
    this.adminService.getActiveUsers()
    .then((results) => {
      if (results instanceof Array) {
        this.users = parseToJSON(results);
      }
    });
  }

}
