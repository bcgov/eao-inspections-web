import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AdminService } from './../../../../../services/admin.service';
import { BasicUser } from '../../../../../models/user.model';
import { ModalService } from './../../../../../services/modal.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: ['./archived-users.component.scss'],
  providers: [ AdminService ]
})
export class ArchivedUsersComponent implements OnInit {
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
  title = "Archived Users";
  link = '/' + Route.DASHBOARD + '/' + Route.ADMIN_USERS;
  users: Array<BasicUser> = undefined;
  page = 0;
  totalPages = 0;

  constructor(private adminService: AdminService,
              private toast: ToastrService,
              private modalService: ModalService) {
  }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onUnarchive(value) {
    this.adminService.unArchiveUser(value).then((object) => {
      this.toast.success('Successfully unarchived ' + object.get('firstName') + ' ' + object.get('lastName'));
      this.adminService.getArchivedUsers()
        .then((results) => {
          this.users = results;
        });
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  ngOnInit() {
    this.adminService.getArchivedUsers()
      .then((results) => {
        this.users = results;
        this.totalPages = this.adminService.totalPages;
      });
  }

  onChangePage(value) {
    this.page = value;
    this.adminService.getArchivedUsers(value)
      .then((results) => {
          this.users = results;
      });
  }
}
