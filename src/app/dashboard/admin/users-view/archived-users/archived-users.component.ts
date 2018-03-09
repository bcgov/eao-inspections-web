import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { parseToJSON } from './../../../../../services/parse.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: ['./archived-users.component.scss'],
  providers: [AdminService]
})
export class ArchivedUsersComponent implements OnInit {
  title = "Archived Users";
  usersLink = Route.ADMIN_USERS;

  modal = {
    header: String.CREATE_USER,
    userButton: String.ADD_BUTTON,
  };

  emptyContent = {
    image: "../../assets/team-member.png",
    message: String.EMPTY_USER,
  };

  users = [];


  constructor(
    private modalService: ModalService,
    private adminService: AdminService
  ) { }

  open(modal) {
    this.modalService.open(modal);
  }

  ngOnInit() {
    this.adminService.getArchivedUsers()
      .then((results) => {
        if (results instanceof Array) {
          this.users = parseToJSON(results);
        }
      });
  }
}
