import { EMPTY_ARCHIVED_USERS } from './../../../../../constants/strings';
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
  providers: [ AdminService ]
})

export class ArchivedUsersComponent implements OnInit {
  title = "Archived Users";
  link = Route.ADMIN_USERS;

  emptyContent = {
    image: "../../assets/team-member.png",
    message: String.EMPTY_ARCHIVED_USERS,
  };

  users = [];


  constructor( private adminService: AdminService ) { }

  ngOnInit() {
    this.adminService.getArchivedUsers()
      .then((results) => {
        if (results instanceof Array) {
          this.users = parseToJSON(results);
        }
      });
  }
}
