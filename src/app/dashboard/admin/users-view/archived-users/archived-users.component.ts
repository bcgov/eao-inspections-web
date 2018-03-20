import { EMPTY_ARCHIVED_USERS } from './../../../../../constants/strings';
import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { parseToJSON } from './../../../../../services/parse.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: ['./archived-users.component.scss'],
  providers: [ AdminService ]
})

export class ArchivedUsersComponent implements OnInit {
  title = "Archived Users";
  link = '/' + Route.DASHBOARD + '/' + Route.ADMIN_USERS;

  emptyContent = {
    image: "../../assets/team-member.png",
    message: String.EMPTY_ARCHIVED_USERS,
  };
  editModal = {
    edit: true,
    message: String.ARCHIVE_USER,
    secondaryMessage: String.UNARCHIVE_USER,
    secondaryYes: String.UNARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
  };

  users = [];


  constructor(private adminService: AdminService, private toast: ToastrService, private modalService: ModalService ) { }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onUnarchive(value) {
    this.adminService.unArchiveUser(value).then((object) => {
      this.toast.success('Successfully unarchived ' + object.get('firstName') + ' ' + object.get('lastName'));
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
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
